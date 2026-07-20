<script setup>
import { ref, computed } from 'vue'
import { supabase } from '../supabase'

const isAuthenticated = ref(false)
const passwordInput = ref('')
const errorMsg = ref('')
const visitorData = ref([])
const searchQuery = ref('')
const deviceFilter = ref('All')
const isLoading = ref(false)

const checkPassword = () => {
  if (passwordInput.value === '7878') {
    isAuthenticated.value = true
    loadData()
  } else {
    errorMsg.value = 'Incorrect Password'
  }
}

const activeTab = ref('analytics')
const messagesData = ref([])

const loadData = async () => {
  isLoading.value = true
  try {
    const [visitorsResponse, messagesResponse] = await Promise.all([
      supabase.from('visitors').select('*').order('created_at', { ascending: false }),
      supabase.from('messages').select('*').order('created_at', { ascending: false })
    ])
    
    if (visitorsResponse.error) throw visitorsResponse.error
    if (messagesResponse.error) throw messagesResponse.error
    
    if (visitorsResponse.data) visitorData.value = visitorsResponse.data
    if (messagesResponse.data) messagesData.value = messagesResponse.data
  } catch (err) {
    console.error("Error loading Supabase data:", err)
    errorMsg.value = "Failed to load database. Check console."
  } finally {
    isLoading.value = false
  }
}

const filteredVisitors = computed(() => {
  let result = visitorData.value
  
  if (deviceFilter.value !== 'All') {
    result = result.filter(v => v.device_type && v.device_type.includes(deviceFilter.value))
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(visitor => {
      return (
        (visitor.ip && visitor.ip.toLowerCase().includes(query)) ||
        (visitor.city && visitor.city.toLowerCase().includes(query)) ||
        (visitor.country && visitor.country.toLowerCase().includes(query)) ||
        (visitor.device_type && visitor.device_type.toLowerCase().includes(query))
      )
    })
  }
  
  return result
})

const filteredMessages = computed(() => {
  let result = messagesData.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(msg => {
      return (
        (msg.name && msg.name.toLowerCase().includes(query)) ||
        (msg.email && msg.email.toLowerCase().includes(query)) ||
        (msg.message && msg.message.toLowerCase().includes(query))
      )
    })
  }
  return result
})

const formatDate = (isoString) => {
  const date = new Date(isoString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  }).format(date)
}

const last7DaysStats = computed(() => {
  const stats = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    stats.push({
      date: dateStr,
      displayDate: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(d),
      count: 0
    })
  }
  
  visitorData.value.forEach(v => {
    if (!v.created_at) return
    const vDate = v.created_at.split('T')[0]
    const statObj = stats.find(s => s.date === vDate)
    if (statObj) {
      statObj.count++
    }
  })
  
  const max = Math.max(...stats.map(s => s.count), 5)
  
  return stats.map(s => ({
    ...s,
    height: `${Math.max((s.count / max) * 100, 5)}%`
  }))
})

const totalVisitors = computed(() => visitorData.value.length)

const visitorsLast30Days = computed(() => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  return visitorData.value.filter(v => new Date(v.created_at) >= thirtyDaysAgo).length
})

const visitorsToday = computed(() => {
  const todayStr = new Date().toISOString().split('T')[0]
  return visitorData.value.filter(v => v.created_at && v.created_at.split('T')[0] === todayStr).length
})
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
        
        <!-- Tab Navigation -->
        <div class="admin-tabs">
          <button :class="['tab-btn', activeTab === 'analytics' ? 'active' : '']" @click="activeTab = 'analytics'">
            <i class="bi bi-bar-chart-fill"></i> Visitor Analytics
          </button>
          <button :class="['tab-btn', activeTab === 'inbox' ? 'active' : '']" @click="activeTab = 'inbox'">
            <i class="bi bi-envelope-paper-fill"></i> Inbox
            <span v-if="messagesData.length" class="badge-count">{{ messagesData.length }}</span>
          </button>
        </div>

        <div class="dashboard-header">
          <div>
            <h2 class="hero-title" style="font-size: 36px; margin-bottom: 8px;">
              <span v-if="activeTab === 'analytics'">Visitor Analytics</span>
              <span v-else>Inbox</span>
            </h2>
            <p class="role-desc" v-if="activeTab === 'analytics'">Live global session tracking</p>
            <p class="role-desc" v-else>Contact form submissions</p>
          </div>
          
          <div class="search-wrapper" style="display: flex; gap: 12px; align-items: center;">
            <div class="filter-chips" v-if="activeTab === 'analytics'">
              <button 
                :class="['filter-chip', deviceFilter === 'All' ? 'active' : '']" 
                @click="deviceFilter = 'All'">All</button>
              <button 
                :class="['filter-chip', deviceFilter === 'Desktop' ? 'active' : '']" 
                @click="deviceFilter = 'Desktop'">Desktop</button>
              <button 
                :class="['filter-chip', deviceFilter === 'Mobile' ? 'active' : '']" 
                @click="deviceFilter = 'Mobile'">Mobile</button>
            </div>
            <input 
              type="text" 
              v-model="searchQuery" 
              :placeholder="activeTab === 'analytics' ? 'Search IP, City...' : 'Search Name, Email...'" 
              class="admin-input search-input"
              style="width: 250px;"
            />
          </div>
        </div>

        <!-- ANALYTICS TAB CONTENT -->
        <div v-if="activeTab === 'analytics'" class="tab-content">
          <!-- Quick Summary Stats -->
          <div class="summary-stats-row">
            <div class="summary-chip">
              <span class="chip-label">Today:</span>
              <span class="chip-value">{{ visitorsToday }}</span>
            </div>
            <div class="summary-chip">
              <span class="chip-label">Last 30 Days:</span>
              <span class="chip-value">{{ visitorsLast30Days }}</span>
            </div>
            <div class="summary-chip">
              <span class="chip-label">Total:</span>
              <span class="chip-value">{{ totalVisitors }}</span>
            </div>
          </div>
          
          <!-- Visitor Graph Section -->
          <div class="stat-card graph-card">
            <h3 class="section-title" style="font-size: 18px; margin-bottom: 20px;">Last 7 Days Visitors</h3>
            <div class="bar-chart">
              <div class="bar-column" v-for="stat in last7DaysStats" :key="stat.date">
                <span class="bar-count">{{ stat.count }}</span>
                <div class="bar-track">
                  <div class="bar-fill" :style="{ height: stat.height }"></div>
                </div>
                <span class="bar-label">{{ stat.displayDate }}</span>
              </div>
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

        <!-- INBOX TAB CONTENT -->
        <div v-if="activeTab === 'inbox'" class="tab-content inbox-grid">
          <div v-if="isLoading" class="empty-state">
            <p class="role-desc">Loading messages...</p>
          </div>
          <div v-else-if="filteredMessages.length === 0" class="empty-state" style="grid-column: 1/-1;">
            <i class="bi bi-envelope-x" style="font-size: 48px; color: var(--text-secondary); margin-bottom: 16px; display: block;"></i>
            <h3 class="section-title">Inbox Zero</h3>
            <p class="role-desc">No messages found matching your criteria.</p>
          </div>
          <div v-else v-for="msg in filteredMessages" :key="msg.id" class="stat-card message-card">
            <div class="msg-header">
              <div style="display: flex; gap: 12px; align-items: center;">
                <div class="avatar-placeholder">{{ msg.name ? msg.name.charAt(0).toUpperCase() : '?' }}</div>
                <div>
                  <h4 class="msg-name">{{ msg.name }}</h4>
                  <a :href="'mailto:' + msg.email" class="msg-email">{{ msg.email }}</a>
                </div>
              </div>
              <span class="time-badge">{{ formatDate(msg.created_at) }}</span>
            </div>
            <div class="msg-body">
              <p>{{ msg.message }}</p>
            </div>
            <div class="msg-footer">
              <a :href="'mailto:' + msg.email" class="btn btn-primary btn-reply">
                <i class="bi bi-reply-fill"></i> Reply
              </a>
            </div>
          </div>
        </div>

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
  position: sticky !important;
  top: 0 !important;
  left: 0 !important;
  transform: none !important;
  max-width: none !important;
  width: 100% !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 20px 40px !important;
  background: rgba(9, 9, 11, 0.8) !important;
  backdrop-filter: blur(16px) !important;
  border-bottom: 1px solid var(--border) !important;
  z-index: 10 !important;
  box-sizing: border-box !important;
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

/* Ultra Compact Summary Stats */
.summary-stats-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.summary-chip {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chip-label {
  font-size: 12px;
  color: var(--text-secondary);
  text-transform: uppercase;
  font-weight: 500;
}

.chip-value {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
}

/* Custom CSS Bar Chart */
.graph-card {
  margin-bottom: 20px;
  background: var(--card-bg);
  padding: 16px 20px;
}

/* Device Filter Chips */
.filter-chips {
  display: flex;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px;
}

.filter-chip {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-chip:hover {
  color: var(--text-primary);
}

.filter-chip.active {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 0 10px var(--accent-glow);
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100px;
  padding-top: 10px;
  border-bottom: 1px solid var(--border);
}

.bar-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 40px;
}

.bar-track {
  width: 100%;
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px 6px 0 0;
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}

.bar-fill {
  width: 100%;
  background: var(--gradient-primary);
  border-radius: 6px 6px 0 0;
  transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 -5px 15px var(--accent-glow);
}

.bar-column:hover .bar-fill {
  filter: brightness(1.2);
}

.bar-count {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.bar-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
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

/* Tabs */
.admin-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.tab-btn.active {
  background: var(--accent-glow);
  color: var(--accent);
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.1);
}

.badge-count {
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: 8px;
}

/* Inbox Tab Styles */
.inbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.message-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
}

.avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.msg-name {
  margin: 0 0 4px 0;
  font-size: 18px;
  color: var(--text-primary);
}

.msg-email {
  color: var(--accent);
  text-decoration: none;
  font-size: 14px;
}

.msg-email:hover {
  text-decoration: underline;
}

.msg-body {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
  white-space: pre-wrap;
  flex-grow: 1;
}

.msg-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.btn-reply {
  padding: 8px 16px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
