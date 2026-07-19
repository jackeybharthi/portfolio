<script setup>
import { ref, computed } from 'vue'
import { supabase } from '../supabase'

const isAuthenticated = ref(false)
const passwordInput = ref('')
const errorMsg = ref('')
const visitorData = ref([])
const searchQuery = ref('')
const isLoading = ref(false)

const checkPassword = () => {
  if (passwordInput.value === '7878') {
    isAuthenticated.value = true
    loadData()
  } else {
    errorMsg.value = 'Incorrect Password'
  }
}

const loadData = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('created_at', { ascending: false })
      
    if (error) throw error
    if (data) {
      visitorData.value = data
    }
  } catch (err) {
    console.error("Error loading Supabase data:", err)
    errorMsg.value = "Failed to load database. Check console."
  } finally {
    isLoading.value = false
  }
}

const filteredVisitors = computed(() => {
  if (!searchQuery.value) return visitorData.value
  
  const query = searchQuery.value.toLowerCase()
  return visitorData.value.filter(visitor => {
    return (
      (visitor.ip && visitor.ip.toLowerCase().includes(query)) ||
      (visitor.city && visitor.city.toLowerCase().includes(query)) ||
      (visitor.country && visitor.country.toLowerCase().includes(query)) ||
      (visitor.device_type && visitor.device_type.toLowerCase().includes(query))
    )
  })
})

const formatDate = (isoString) => {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(date)
}
</script>

<template>
  <!-- Fullscreen wrapper to break out of the #app 1000px constraint -->
  <div class="admin-fullscreen-wrapper">
    <!-- Re-add background elements for the full screen effect -->
    <div class="bg-orbs-container">
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
    </div>
    <div class="bg-grid-lines">
      <div class="grid-line" v-for="i in 5" :key="i"></div>
    </div>

    <!-- Navigation / Header for Admin -->
    <header class="admin-header">
      <router-link to="/" class="back-link">← Back to Portfolio</router-link>
      <div class="logo">Admin<span>Panel</span></div>
    </header>

    <div class="admin-content-area">
      <!-- Login Card -->
      <div v-if="!isAuthenticated" class="login-container">
        <div class="stat-card login-card">
          <div class="icon">🔒</div>
          <h2 class="section-title" style="margin-bottom: 8px;">Restricted Access</h2>
          <p class="role-desc" style="margin-bottom: 24px;">Enter password to view analytics.</p>
          
          <div class="input-wrapper">
            <input 
              type="password" 
              v-model="passwordInput" 
              @keyup.enter="checkPassword"
              placeholder="Password" 
              class="admin-input"
            />
          </div>
          
          <button class="btn btn-primary" @click="checkPassword" style="width: 100%;">
            Unlock Dashboard
          </button>
          <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
        </div>
      </div>

      <!-- Dashboard -->
      <div v-else class="dashboard-container">
        <div class="dashboard-header">
          <div>
            <h2 class="hero-title" style="font-size: 36px; margin-bottom: 8px;">
              <span>Visitor Analytics</span>
            </h2>
            <p class="role-desc">Live global session tracking</p>
          </div>
          
          <div class="search-wrapper">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search IP, City, Device..." 
              class="admin-input search-input"
            />
          </div>
        </div>
        
        <div class="mock-terminal table-wrapper">
          <div class="terminal-header">
            <div class="dots">
              <div class="dot red"></div>
              <div class="dot yellow"></div>
              <div class="dot green"></div>
            </div>
            <span class="file-name">visitor_data.json</span>
          </div>
          
          <div class="table-scroll-container">
            <table class="glass-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Visitor ID</th>
                  <th>IPv4 Address</th>
                  <th>Location</th>
                  <th>Device</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(visitor, index) in filteredVisitors" :key="visitor.visitor_id || index">
                <td>
                  <span class="badge time-badge">{{ formatDate(visitor.created_at) }}</span>
                </td>
                <td class="mono-text">{{ visitor.visitor_id ? visitor.visitor_id.split('_')[1] : 'unknown' }}</td>
                <td class="mono-text highlight">{{ visitor.ip }}</td>
                <td>
                  <div class="location-col">
                    <span class="city">{{ visitor.city || 'Unknown' }}</span>
                    <span class="country">{{ visitor.country }}</span>
                  </div>
                </td>
                <td>
                  <span :class="['badge', visitor.device_type === 'Desktop' ? 'badge-desktop' : 'badge-mobile']">
                    <div :class="['badge-dot', visitor.device_type === 'Desktop' ? 'dot-desktop' : 'dot-mobile']"></div>
                    {{ visitor.device_type }}
                  </span>
                </td>
              </tr>
              <tr v-if="isLoading">
                <td colspan="5" class="empty-state">
                  <p class="role-desc">Loading data from Supabase...</p>
                </td>
              </tr>
              <tr v-else-if="filteredVisitors.length === 0">
                <td colspan="5" class="empty-state">
                  <p class="role-desc">No visitor records found.</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <p class="role-desc" style="text-align: right; margin-top: 20px;">
          Showing {{ filteredVisitors.length }} total records
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fullscreen Override to bypass #app 1000px max-width */
.admin-fullscreen-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg);
  z-index: 9999;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Custom Admin Header */
.admin-header {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  z-index: 10;
  box-sizing: border-box;
}

.back-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--text-primary);
}

.admin-header .logo span {
  color: var(--text-secondary);
  font-weight: 400;
  margin-left: 8px;
}

/* Content Area inside fullscreen wrapper */
.admin-content-area {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
  box-sizing: border-box;
}

/* Login State */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
}

.login-card {
  width: 100%;
  max-width: 450px;
  padding: 50px 40px;
  background: rgba(20, 20, 25, 0.7);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.input-wrapper {
  margin-bottom: 20px;
}

.admin-input {
  width: 100%;
  padding: 14px 18px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 15px;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.admin-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-glow);
}

.error-msg {
  color: #ef4444;
  margin-top: 14px;
  font-size: 14px;
  font-weight: 500;
}

/* Dashboard State */
.dashboard-container {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.search-wrapper {
  width: 100%;
  max-width: 350px;
}

/* Table Design mimicking the Terminal aesthetic */
.table-wrapper {
  max-width: 100%;
  margin: 0;
  background: #09090b; /* Extra dark for terminal */
}

.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #eab308; }
.dot.green { background: #22c55e; }

.table-scroll-container {
  overflow-x: auto;
  width: 100%;
}

.glass-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  min-width: 800px;
}

.glass-table th {
  padding: 20px;
  font-family: var(--font-heading);
  color: var(--text-secondary);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
}

.glass-table td {
  padding: 20px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.glass-table tbody tr {
  transition: background-color 0.2s ease;
}

.glass-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.04);
}

.mono-text {
  font-family: var(--font-mono, monospace);
  color: var(--text-secondary);
}

.highlight {
  color: var(--accent);
  font-weight: 600;
}

.location-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.city {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 15px;
}

.country {
  font-size: 13px;
  color: var(--text-secondary);
}

/* Badges */
.time-badge {
  background: rgba(255, 255, 255, 0.08);
  font-family: var(--font-mono, monospace);
  border: none;
  font-size: 13px;
}

.badge-desktop {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.dot-desktop {
  background: #34d399;
  box-shadow: 0 0 8px #34d399;
}

.badge-mobile {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.dot-mobile {
  background: #fbbf24;
  box-shadow: 0 0 8px #fbbf24;
}

.empty-state {
  text-align: center;
  padding: 80px !important;
}
</style>
