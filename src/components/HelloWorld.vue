<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Header from './Header.vue'
import { isDark, initTheme } from '../composables/useTheme'
import { supabase } from '../supabase'

const projects = ref([
  {
    name: 'JobDekho',
    desc: 'A full-featured job portal platform built with a robust Laravel backend. Designed for seamless job searching and recruitment management.',
    tech: ['Laravel', 'PHP', 'MySQL', 'REST APIs'],
    link: 'https://www.jobdekhofor.me/',
    category: 'Laravel'
  },
  {
    name: 'Perfume Worlds',
    desc: 'An elegant e-commerce platform for premium fragrances, built with a high-performance Laravel backend to manage inventory and orders.',
    tech: ['Laravel', 'PHP', 'JavaScript', 'CSS3'],
    link: 'https://www.perfumeworlds.com/',
    category: 'Laravel'
  },
  {
    name: 'VMS Accounts CRM',
    desc: 'A comprehensive custom CRM platform featuring multi-module support, multi-currency transactions, and complete management for customers, suppliers, orders, payments, credits, and advances.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Vue.js'],
    link: 'https://vmsaccounts.com/login',
    category: 'Laravel'
  },
  {
    name: 'EcoRides Kigali',
    desc: 'A professional and fully customized WordPress website designed for sustainable eco-friendly transportation services in Kigali.',
    tech: ['WordPress', 'PHP', 'JavaScript', 'CSS3'],
    link: 'https://ecorideskigali.com/',
    category: 'WordPress'
  },
  {
    name: 'eCars Kigali',
    desc: 'A modern, high-performance WordPress platform for electric vehicle rentals and services in Rwanda, featuring custom booking integrations.',
    tech: ['WordPress', 'PHP', 'JavaScript', 'CSS3'],
    link: 'https://ecarskigali.com/',
    category: 'WordPress'
  },
  {
    name: 'Myshop1 Mobile App',
    desc: 'A mobile client for e-commerce stores built using Android SDK, featuring smooth checkout and product search.',
    tech: ['Android SDK', 'REST APIs', 'SQLite'],
    link: 'https://github.com/jackeybharthi/Myshop1',
    category: 'Mobile'
  }
])

const categories = ['All', 'Laravel', 'WordPress', 'Mobile']
const selectedCategory = ref('All')
const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') return projects.value
  return projects.value.filter(p => p.category === selectedCategory.value)
})

const skills = ref([
  {
    category: 'Frontend & Frameworks',
    items: [
      { name: 'React / Next.js', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Vue.js / Nuxt.js', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'Redux / Pinia', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' }
    ]
  },
  {
    category: 'Backend & Database',
    items: [
      { name: 'Laravel / PHP', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
      { name: 'Node.js / Express', level: 'Advanced', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'C / C++', level: 'Advanced', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'MySQL / PostgreSQL', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Supabase', level: 'Advanced', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' }
    ]
  },
  {
    category: 'Cloud, Mobile & AI Tools',
    items: [
      { name: 'AWS Cloud', level: 'Advanced', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'n8n & AI Automation', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
      { name: 'WordPress Development', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
      { name: 'React Native', level: 'Advanced', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
    ]
  }
])

const name = ref('')
const email = ref('')
const message = ref('')
const formSubmitted = ref(false)
const submitting = ref(false)

const getTechTagStyle = (tech) => {
  const colors = {
    'laravel': { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
    'php': { color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' },
    'mysql': { color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.15)' },
    'wordpress': { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)' },
    'javascript': { color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)' },
    'css3': { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
    'java': { color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' },
    'android sdk': { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)' },
    'sqlite': { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)' },
    'rest apis': { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' }
  }
  const key = tech.toLowerCase()
  return colors[key] || { color: 'var(--accent)', bg: 'var(--accent-glow)' }
}

const handleSend = async () => {
  if (name.value && email.value && message.value) {
    submitting.value = true
    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          name: name.value,
          email: email.value,
          message: message.value
        }])
        
      if (error) throw error

      formSubmitted.value = true
      name.value = ''
      email.value = ''
      message.value = ''
      setTimeout(() => {
        formSubmitted.value = false
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to send message. Please try again or use direct email.')
    } finally {
      submitting.value = false
    }
  }
}
const mouseX = ref(0)
const mouseY = ref(0)
const cursorX = ref(-1000)
const cursorY = ref(-1000)
const particles = ref([])

const handleMouseMove = (e) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 35
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 35
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const terminalInput = ref('')
const terminalLines = ref([
  { text: 'Jackey Bharthi Interactive Portfolio Terminal [Version 1.0.0]', type: 'system' },
  { text: 'Type "help" to see available commands.', type: 'system' },
  { text: '', type: 'system' }
])

const handleTerminalCommand = () => {
  const cmd = terminalInput.value.trim().toLowerCase()
  if (!cmd) return

  terminalLines.value.push({ text: `visitor@jackeybharthi:~$ ${terminalInput.value}`, type: 'input' })
  
  switch(cmd) {
    case 'help':
      terminalLines.value.push({ text: 'Available commands:\n  about     - Learn more about me\n  skills    - Print key skills\n  contact   - Get email, phone and socials info\n  matrix    - ???\n  clear     - Clear the terminal screen', type: 'response' })
      break
    case 'about':
      terminalLines.value.push({ text: 'I am a Full-Stack Software Developer specializing in building high-performance web applications using Laravel, React, Vue, Next.js, and WordPress. Based in Ahmedabad.', type: 'response' })
      break
    case 'skills':
      terminalLines.value.push({ text: '=== Tech Stack ===\n* Laravel & PHP\n* AWS, Supabase, n8n AI Automation\n* React, Next.js, Vue\n* Node.js & C / C++\n* MySQL, PostgreSQL, React Native', type: 'response' })
      break
    case 'contact':
      terminalLines.value.push({ text: 'Email: jackey.bharthi@gmail.com\nWhatsApp: +91 82000 04544\nLocation: Ahmedabad, Gujarat, India\nLinkedIn: linkedin.com/in/jackeybharthi', type: 'response' })
      break
    case 'matrix':
      triggerMatrixMode()
      terminalLines.value.push({ text: 'Wake up, Neo...\nMatrix mode activated.', type: 'response', style: 'color: #0f0' })
      break
    case 'sudo rm -rf /':
      terminalLines.value.push({ text: 'Executing... permissions bypassed.', type: 'error' })
      setTimeout(() => {
        document.body.innerHTML = '<div style="background: #ef4444; color: #fff; height: 100vh; width: 100vw; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; font-size: 24px; text-align: center; position: fixed; top: 0; left: 0; z-index: 999999;"><h1>FATAL ERROR</h1><p>KERNEL PANIC - CRITICAL SYSTEM FAILURE</p><p id="reboot-timer">Rebooting in 3...</p></div>'
        let count = 3
        const interval = setInterval(() => {
          count--
          const timer = document.getElementById('reboot-timer')
          if (timer) timer.innerText = `Rebooting in ${count}...`
          if (count <= 0) {
            clearInterval(interval)
            window.location.reload()
          }
        }, 1000)
      }, 1500)
      break
    case 'clear':
      terminalLines.value = []
      break
    default:
      terminalLines.value.push({ text: `Command not found: "${cmd}". Type "help" for a list of commands.`, type: 'error' })
  }
  
  terminalInput.value = ''
  setTimeout(() => {
    const body = document.querySelector('.terminal-body')
    if (body) body.scrollTop = body.scrollHeight
  }, 50)
}

const matrixInterval = ref(null)

const triggerMatrixMode = () => {
  let canvas = document.getElementById('matrix-canvas')
  if (canvas) {
    clearInterval(matrixInterval.value)
    canvas.remove()
    return // Toggle off if already exists
  }

  canvas = document.createElement('canvas')
  canvas.id = 'matrix-canvas'
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.zIndex = '9999'
  canvas.style.pointerEvents = 'none'
  canvas.style.opacity = '0.75'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+='
  const fontSize = 16
  const columns = canvas.width / fontSize
  const drops = Array.from({ length: columns }).map(() => 1)

  matrixInterval.value = setInterval(() => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.fillStyle = '#0F0'
    ctx.font = fontSize + 'px monospace'

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }, 33)
}

const activeSection = ref('')
const typedText = ref('')
const words = ['full-stack web applications', 'custom Laravel backends', 'bespoke WordPress themes', 'responsive user experiences']
let wordIdx = 0
let charIdx = 0
let isDeleting = false

const typeEffect = () => {
  const currentWord = words[wordIdx]
  if (isDeleting) {
    typedText.value = currentWord.substring(0, charIdx - 1)
    charIdx--
  } else {
    typedText.value = currentWord.substring(0, charIdx + 1)
    charIdx++
  }
  
  let speed = isDeleting ? 40 : 80
  
  if (!isDeleting && charIdx === currentWord.length) {
    isDeleting = true
    speed = 1500
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false
    wordIdx = (wordIdx + 1) % words.length
    speed = 400
  }
  
  setTimeout(typeEffect, speed)
}

const createClickSparks = (e) => {
  // Don't spawn if clicking inside the terminal input to avoid distraction
  if (e.target.tagName === 'INPUT') return;

  const colors = ['#38bdf8', '#a855f7', '#6366f1', '#10b981'];
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement('div');
    spark.style.position = 'fixed';
    spark.style.left = e.clientX + 'px';
    spark.style.top = e.clientY + 'px';
    spark.style.width = '6px';
    spark.style.height = '6px';
    spark.style.borderRadius = '50%';
    spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    spark.style.pointerEvents = 'none';
    spark.style.zIndex = '99999';
    spark.style.transition = 'transform 0.6s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.6s ease';
    spark.style.boxShadow = `0 0 10px ${spark.style.backgroundColor}`;
    
    document.body.appendChild(spark);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 40 + Math.random() * 60;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    // Trigger animation next frame
    requestAnimationFrame(() => {
      spark.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
      spark.style.opacity = '0';
    });

    setTimeout(() => {
      spark.remove();
    }, 600);
  }
}

let profileClickCount = 0;
const handleProfileClick = (e) => {
  profileClickCount++;
  if (profileClickCount >= 3) {
    e.target.style.transition = 'transform 4s cubic-bezier(0.2, 1, 0.3, 1)';
    e.target.style.transform = `translate3d(${mouseX.value * 0.4}px, ${mouseY.value * 0.4}px, 0) rotate(1080deg) scale(1.2)`;
    setTimeout(() => {
      profileClickCount = 0;
      e.target.style.transition = 'all 0.4s ease-out';
      e.target.style.transform = `translate3d(${mouseX.value * 0.4}px, ${mouseY.value * 0.4}px, 0) rotate(0deg) scale(1)`;
    }, 4000);
  }
}

const scrollProgress = ref(0)
const handleScroll = () => {
  // Update scroll progress
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollTop = window.scrollY;
  scrollProgress.value = (scrollTop / docHeight) * 100;

  const sections = ['projects', 'skills', 'contact']
  const scrollPosition = window.scrollY + 120
  
  let currentSec = ''
  for (const sec of sections) {
    const el = document.getElementById(sec)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSec = sec
        break
      }
    }
  }
  activeSection.value = currentSec
}

const handleCardTilt = (e, index) => {
  const card = document.getElementById(`project-card-${index}`);
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -12;
  const rotateY = ((x - centerX) / centerX) * 12;
  
  card.style.transform = `perspective(1000px) scale3d(1.03, 1.03, 1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  card.style.transition = 'none';
  card.style.zIndex = '10';
  card.style.boxShadow = `0 20px 40px rgba(168, 85, 247, 0.2)`;
  card.style.setProperty('--mouse-x', `${x}px`);
  card.style.setProperty('--mouse-y', `${y}px`);
};

const resetCardTilt = (index) => {
  const card = document.getElementById(`project-card-${index}`);
  if (!card) return;
  card.style.transform = '';
  card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  card.style.zIndex = '1';
  card.style.boxShadow = '';
};

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

const handleKeydown = (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      document.body.classList.toggle('retro-crt-mode');
      const terminalBody = document.querySelector('.terminal-body');
      if (terminalBody) {
        terminalLines.value.push({ text: 'KONAMI CODE ACCEPTED. Retro CRT Mode activated.', type: 'response', style: 'color: #ff00ff; font-weight: bold;' });
        setTimeout(() => terminalBody.scrollTop = terminalBody.scrollHeight, 50);
      }
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
};

const scrambleText = (el) => {
  const originalText = el.dataset.text || el.innerText;
  if (!el.dataset.text) el.dataset.text = originalText;
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let iterations = 0;
  
  const interval = setInterval(() => {
    el.innerText = originalText.split('').map((letter, index) => {
      if(index < iterations) return originalText[index];
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    
    if(iterations >= originalText.length) clearInterval(interval);
    iterations += 1/3; // Speed of decoding
  }, 30);
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('click', createClickSparks)
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeydown)
  
  // Launch typing effect
  typeEffect()
  
  // Initial active section calculation
  handleScroll()

  // Intersection Observer for fade-in animations and text scramble
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        
        // Trigger text scramble for section titles
        const title = entry.target.querySelector('.section-title')
        if (title && !title.classList.contains('scrambled')) {
          title.classList.add('scrambled');
          scrambleText(title);
        }
      }
    })
  }, { threshold: 0.08 })
  
  // Initialize particles
  for (let i = 0; i < 20; i++) {
    particles.value.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 12,
      duration: Math.random() * 18 + 12,
      opacity: Math.random() * 0.45 + 0.15
    })
  }

  // Always default to dark theme on load or use saved
  initTheme()

  
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal')
    revealObserver.observe(section)
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('click', createClickSparks)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})

const previewProject = ref(null)
const openPreview = (project) => {
  previewProject.value = project
  document.body.style.overflow = 'hidden'
}
const closePreview = () => {
  previewProject.value = null
  document.body.style.overflow = ''
}
</script>

<template>
  <div id="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
  <div class="bg-grid-lines">
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
    <div class="grid-line"></div>
  </div>
  <div class="cursor-glow" :style="{ left: cursorX + 'px', top: cursorY + 'px' }"></div>
  <div class="bg-orbs-container" :style="{ transform: 'translate3d(' + (mouseX * -0.2) + 'px, ' + (mouseY * -0.2) + 'px, 0)' }">
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="bg-orb bg-orb-3"></div>
  </div>
  
  <div class="celestial-container" :style="{ transform: 'translate3d(' + (mouseX * -0.6) + 'px, ' + (mouseY * -0.6) + 'px, 0)' }">
    <div class="celestial-moon" :class="{ 'visible': isDark }">
      <div class="crater c1"></div>
      <div class="crater c2"></div>
      <div class="crater c3"></div>
    </div>
    <div class="celestial-sun" :class="{ 'visible': !isDark }">
      <div class="sun-core"></div>
      <div class="sun-ray r1"></div>
      <div class="sun-ray r2"></div>
      <div class="sun-ray r3"></div>
      <div class="sun-ray r4"></div>
    </div>
  </div>
  <div class="bg-particles-container">
    <div 
      v-for="p in particles" 
      :key="p.id" 
      class="bg-particle-wrapper"
      :style="{
        left: p.x + '%',
        animationDelay: p.delay + 's',
        animationDuration: p.duration + 's'
      }"
    >
      <div 
        class="bg-particle"
        :style="{
          width: p.size + 'px',
          height: p.size + 'px',
          opacity: p.opacity,
          transform: 'translate3d(' + (mouseX * (p.size * -0.12)) + 'px, ' + (mouseY * (p.size * -0.12)) + 'px, 0)'
        }"
      ></div>
    </div>
  </div>
  <Header :activeSection="activeSection" />

  <main>
    <section class="hero-section">
      <div class="hero-content">
        <div class="badge">
          <span class="badge-dot"></span>
          Available for Web Dev roles
        </div>
        <h1 class="hero-title">
          <span class="glitch-text" data-text="Building high-performance,">Building high-performance,</span><br>
          <span class="animated-gradient-text">{{ typedText }}<span class="typed-cursor" style="color: var(--accent); margin-left: 4px; font-weight: 300;">|</span></span>
        </h1>
        <p class="hero-desc">
          I am a Full-Stack Developer at <a href="https://www.skywaveinfosolutions.com/" target="_blank" style="color: var(--accent); text-decoration: none;">Skywave Info Solutions</a> specializing in Laravel, WordPress, React, Next.js, and Node.js. 
          Focused on crafting premium user experiences that are fast, modern, and highly scalable.
        </p>
        <div class="cta-group">
          <a href="javascript:void(0)" @click.prevent="scrollToSection('projects')" class="btn btn-primary">Explore Work</a>
          <a href="javascript:void(0)" @click.prevent="scrollToSection('contact')" class="btn btn-secondary">Get in Touch</a>
        </div>
      </div>
      <div class="hero-image-wrapper">
        <div class="hero-orb" :style="{ transform: 'translate3d(' + (mouseX * -0.8) + 'px, ' + (mouseY * -0.8) + 'px, 0)' }"></div>
        <img src="/profile.jpg" alt="Jackey Bharthi" class="profile-photo" :style="{ transform: 'translate3d(' + (mouseX * 0.4) + 'px, ' + (mouseY * 0.4) + 'px, 0)' }" @click="handleProfileClick" />
      </div>
    </section>

    <div class="tech-marquee-container">
      <div class="tech-marquee-wrapper">
        <div class="tech-marquee-track">
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="" /> AWS</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" alt="" /> Supabase</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="" /> n8n AI</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" alt="" /> Laravel</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="" /> WordPress</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="" /> React</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="" /> Next.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="" /> Vue.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="" /> Node.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="" /> MySQL</span>
        </div>
        <div class="tech-marquee-track">
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="" /> AWS</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" alt="" /> Supabase</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="" /> n8n AI</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" alt="" /> Laravel</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="" /> WordPress</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="" /> React</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="" /> Next.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="" /> Vue.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="" /> Node.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="" /> MySQL</span>
        </div>
      </div>
    </div>



    <section id="projects">
      <h2 class="section-title">Selected Projects</h2>
      
      <div class="project-filters">
        <button 
          v-for="cat in categories" 
          :key="cat" 
          @click="selectedCategory = cat"
          :class="['filter-btn', { active: selectedCategory === cat }]"
        >
          {{ cat }}
        </button>
      </div>

      <div class="projects-grid">
        <div v-for="(project, index) in filteredProjects" :key="project.name" class="project-card" :id="'project-card-' + index" @mousemove="(e) => handleCardTilt(e, index)" @mouseleave="resetCardTilt(index)" :style="{ '--stagger-idx': index }">
          <div class="project-tech">
            <span v-for="tech in project.tech" :key="tech" class="tech-tag" :style="{ color: getTechTagStyle(tech).color, background: getTechTagStyle(tech).bg }">{{ tech }}</span>
          </div>
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-desc">{{ project.desc }}</p>
          <div class="project-actions">
            <button @click="openPreview(project)" class="btn-preview">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Quick View
            </button>
          </div>
        </div>
      </div>
    </section>

    <section id="skills">
      <h2 class="section-title">Skills & Expertise</h2>
      <div class="skills-container">
        <div v-for="cat in skills" :key="cat.category" class="skills-category">
          <h3>{{ cat.category }}</h3>
          <div class="skills-list">
            <div v-for="(skill, index) in cat.items" :key="skill.name" class="skill-item" :style="{ '--stagger-idx': index, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }">
              <div style="display: flex; align-items: center; gap: 10px;">
                <img :src="skill.icon" alt="" style="width: 20px; height: 20px; object-fit: contain;" />
                <span class="skill-name">{{ skill.name }}</span>
              </div>
              <span class="skill-level">{{ skill.level }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact">
      <h2 class="section-title">Let's Connect</h2>
      <div class="contact-container">
        <p class="contact-desc">
          Interested in working together or hiring me for your team? Shoot me a message or reach out directly.
        </p>

        <div class="contact-info" style="margin-bottom: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div class="stat-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <i class="bi bi-envelope-fill" style="font-size: 24px; color: var(--accent); margin-bottom: 8px;"></i>
            <span class="stat-label">Email</span>
            <a href="mailto:jackey.bharthi@gmail.com" class="project-link" style="margin-top: 4px; display: block; font-weight: 600;">jackey.bharthi@gmail.com</a>
          </div>
          <div class="stat-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <i class="bi bi-whatsapp" style="font-size: 24px; color: #25d366; margin-bottom: 8px;"></i>
            <span class="stat-label">WhatsApp / Phone</span>
            <a href="https://wa.me/+918200004544" target="_blank" class="project-link" style="margin-top: 4px; display: block; font-weight: 600;">+91 82000 04544</a>
          </div>
          <div class="stat-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <i class="bi bi-geo-alt-fill" style="font-size: 24px; color: var(--accent); margin-bottom: 8px;"></i>
            <span class="stat-label">Location</span>
            <span class="skill-name" style="margin-top: 4px; display: block; font-weight: 600; text-align: center;">Ahmedabad, Gujarat, India</span>
          </div>
        </div>

        
        <div class="mock-terminal">
          <div class="terminal-header">
            <div class="dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="file-name" style="font-size: 11px;">bash - jackeybharthi.sh</span>
          </div>
          <div class="terminal-body">
            <div v-for="(line, idx) in terminalLines" :key="idx" class="terminal-line" :style="{ color: line.type === 'error' ? '#ef4444' : (line.type === 'input' ? 'var(--accent)' : 'inherit') }">
              {{ line.text }}
            </div>

            <form @submit.prevent="handleTerminalCommand" class="terminal-input-line">
              <span class="terminal-prompt">visitor@jackeybharthi:~$</span>
              <input type="text" v-model="terminalInput" class="terminal-input" placeholder="Type a command..." />
            </form>
          </div>
        </div>

        <div v-if="formSubmitted" class="success-alert">
          Thank you! Your message has been sent successfully.
        </div>

        <form @submit.prevent="handleSend" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" class="form-input" required placeholder="Your Name" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" class="form-input" required placeholder="you@example.com" />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="message" class="form-textarea" required placeholder="What would you like to discuss?"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="margin-top: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
            <span v-if="submitting">Sending Message...</span>
            <i v-if="submitting" class="bi bi-arrow-repeat spin" style="font-size: 16px;"></i>
            <span v-else>Send Message</span>
          </button>
        </form>
      </div>
    </section>
  </main>

  <footer style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 40px 0; border-top: 1px solid var(--border);">
    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
      <a href="https://github.com/jackeybharthi" target="_blank" class="project-link" style="display: flex; align-items: center; gap: 6px;">
        <i class="bi bi-github"></i> GitHub
      </a>
      <a href="https://www.linkedin.com/in/jackeybharthi/" target="_blank" class="project-link" style="display: flex; align-items: center; gap: 6px;">
        <i class="bi bi-linkedin"></i> LinkedIn
      </a>
      <a href="https://twitter.com/jackey_bharthi" target="_blank" class="project-link" style="display: flex; align-items: center; gap: 6px;">
        <i class="bi bi-twitter-x"></i> Twitter / X
      </a>
      <a href="https://www.instagram.com/jackey_bharthi/" target="_blank" class="project-link" style="display: flex; align-items: center; gap: 6px;">
        <i class="bi bi-instagram"></i> Instagram
      </a>
      <a href="https://www.facebook.com/jackey.bharthi/" target="_blank" class="project-link" style="display: flex; align-items: center; gap: 6px;">
        <i class="bi bi-facebook"></i> Facebook
      </a>
      <a href="https://www.snapchat.com/add/jackie_goswami" target="_blank" class="project-link" style="display: flex; align-items: center; gap: 6px;">
        <i class="bi bi-snapchat"></i> Snapchat
      </a>
    </div>
    <div style="color: var(--text-secondary); font-size: 13px; margin-top: 8px; display: flex; align-items: center; gap: 8px;">
      <span>© 2026 Jackey Bharthi. All rights reserved.</span>
      <router-link to="/admin" style="color: var(--text-secondary); opacity: 0.5; transition: opacity 0.2s;" title="Admin Dashboard">
        <i class="bi bi-lock-fill" style="font-size: 12px;"></i>
      </router-link>
    </div>
  </footer>

  <!-- Project Preview Modal -->
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="previewProject" class="preview-overlay" @click="closePreview">
        <div class="preview-modal" @click.stop>
          <div class="preview-header">
            <h3>{{ previewProject.name }}</h3>
            <div class="preview-actions">
              <button @click="closePreview" class="btn-close" title="Close preview">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
          <div class="preview-content">
            <div class="preview-loader"></div>
            <iframe :src="previewProject.link" title="Project Preview" loading="lazy" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
