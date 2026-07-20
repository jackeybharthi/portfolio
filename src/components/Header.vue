<script setup>
import { defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { isDark, toggleTheme } from '../composables/useTheme'

const props = defineProps({
  activeSection: {
    type: String,
    default: ''
  }
})

const router = useRouter()
const route = useRoute()

const navigateTo = (section) => {
  if (section === 'about') {
    if (route.path !== '/about') router.push('/about')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  if (section === 'experience') {
    if (route.path !== '/about') {
      router.push('/about')
      setTimeout(() => {
        const el = document.getElementById('experience')
        if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' })
      }, 150)
    } else {
      const el = document.getElementById('experience')
      if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' })
    }
    return
  }

  if (route.path !== '/') {
    router.push('/')
    setTimeout(() => {
      const el = document.getElementById(section)
      if (el) {
        window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
      }
    }, 150)
  } else {
    const el = document.getElementById(section)
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
    }
  }
}

const handleLogoClick = () => {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <header>
    <router-link to="/" @click="handleLogoClick" class="logo" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#logo-grad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;" class="generic-logo">
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a855f7" />
            <stop offset="100%" stop-color="#6366f1" />
          </linearGradient>
        </defs>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      <span class="logo-text">Jackey Bharthi</span>
    </router-link>
    <nav>
      <a href="javascript:void(0)" @click.prevent="navigateTo('about')" :class="['about-pill', { active: route.path === '/about' }]">
        <img src="/profile.jpg" alt="Jackey" class="header-avatar" />
        <span class="about-text desktop-text">About</span>
      </a>
      <a href="javascript:void(0)" @click.prevent="navigateTo('projects')" :class="['nav-link', { active: activeSection === 'projects' && route.path === '/' }]">
        <i class="bi bi-grid-fill mobile-icon"></i>
        <span class="desktop-text">Projects</span>
      </a>
      <a href="javascript:void(0)" @click.prevent="navigateTo('skills')" :class="['nav-link', { active: activeSection === 'skills' && route.path === '/' }]">
        <i class="bi bi-lightning-fill mobile-icon"></i>
        <span class="desktop-text">Skills</span>
      </a>
      <a href="javascript:void(0)" @click.prevent="navigateTo('contact')" :class="['nav-link', { active: activeSection === 'contact' && route.path === '/' }]">
        <i class="bi bi-chat-dots-fill mobile-icon"></i>
        <span class="desktop-text">Contact</span>
      </a>
      
      <div class="theme-switch" @click="toggleTheme" role="button" aria-label="Toggle Dark Mode">
        <div class="switch-track" :class="{ 'is-light': !isDark }">
          <div class="switch-thumb"></div>
          <i class="bi bi-moon-stars-fill icon-moon"></i>
          <i class="bi bi-sun-fill icon-sun"></i>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.about-pill {
  display: flex !important;
  align-items: center;
  gap: 8px;
  padding: 4px 12px 4px 4px !important;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 20px !important;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.about-pill:hover, .about-pill.active {
  background: var(--accent-glow) !important;
  border-color: var(--accent) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.2);
}

.header-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.about-text {
  font-weight: 600;
  font-size: 13px;
  color: var(--accent);
}

.about-pill:hover .about-text, .about-pill.active .about-text {
  color: var(--text-primary);
}

/* Icon Based Mobile UI Styles */
.mobile-icon {
  display: none;
  font-size: 18px;
}

@media (max-width: 768px) {
  header {
    padding: 12px 20px !important;
  }
  
  .logo-text {
    display: none !important;
  }
  
  .generic-logo {
    width: 28px;
    height: 28px;
  }

  .desktop-text {
    display: none !important;
  }
  
  .mobile-icon {
    display: block;
    font-size: 20px;
  }
  
  /* Mobile Bottom Navigation Bar */
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(9, 9, 11, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--border);
    padding: 12px 24px !important;
    justify-content: space-between;
    gap: 0 !important;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.1);
    z-index: 1000;
  }
  
  .nav-link {
    padding: 8px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  .nav-link.active .mobile-icon {
    color: var(--accent);
    transform: translateY(-4px) scale(1.1);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .about-pill {
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
    border-radius: 50% !important;
  }

  .about-pill .header-avatar {
    width: 32px;
    height: 32px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
  }

  .about-pill.active .header-avatar {
    border-color: var(--accent);
    transform: translateY(-4px);
  }
}
</style>
