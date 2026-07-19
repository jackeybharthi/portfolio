<script setup>
import { onMounted } from 'vue'
import { supabase } from './supabase'

onMounted(async () => {
  try {
    // 1. Fetch IPv4 specifically
    const ipResponse = await fetch('https://api4.ipify.org?format=json')
    const ipData = await ipResponse.json()
    const ipv4 = ipData.ip

    // 2. Fetch Location data based on that IPv4
    const response = await fetch(`https://ipapi.co/${ipv4}/json/`)
    const locationData = await response.json()

    // 3. Determine Device Type and Browser
    const userAgent = navigator.userAgent
    let deviceType = 'Desktop'
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'Mobile/Tablet'
    }

    // 4. Generate a simple anonymous Visitor ID (saved locally so we don't count them twice)
    let visitorId = localStorage.getItem('visitor_id')
    if (!visitorId) {
      visitorId = 'user_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('visitor_id', visitorId)
    }

    // Prepare the final JSON object
    const visitorInfo = {
      visitorId: visitorId,
      deviceType: deviceType,
      ip: ipv4, // Guaranteed to be IPv4 now
      city: locationData.city,
      country: locationData.country_name,
      browserInfo: userAgent,
      timestamp: new Date().toISOString()
    }

    console.log("Visitor Info JSON (IPv4):", visitorInfo)
    
    // Save to Supabase Cloud Database!
    try {
      // Check if visitor already exists
      const { data: existingVisitor } = await supabase
        .from('visitors')
        .select('id')
        .eq('visitor_id', visitorId)
        .single()

      const dbPayload = {
        visitor_id: visitorId,
        ip: ipv4,
        city: locationData.city || 'Unknown',
        country: locationData.country_name || 'Unknown',
        device_type: deviceType,
        browser_info: userAgent
      }

      if (existingVisitor) {
        // Update existing record
        await supabase
          .from('visitors')
          .update(dbPayload)
          .eq('id', existingVisitor.id)
      } else {
        // Insert new record
        await supabase
          .from('visitors')
          .insert([dbPayload])
      }
    } catch (dbError) {
      console.error("Supabase Error:", dbError)
    }

  } catch (error) {
    console.error("Error fetching visitor info:", error)
  }
})
</script>

<template>
  <router-view />
</template>
