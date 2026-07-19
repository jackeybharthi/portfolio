<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const projects = ref([
  {
    name: 'Laravel Enterprise Portal',
    desc: 'A robust headless back-end portal and REST API built with Laravel, PHP, and MySQL, featuring multi-tenant auth and custom reporting.',
    tech: ['Laravel', 'PHP', 'MySQL', 'REST APIs'],
    link: 'https://github.com/jackeybharthi',
    category: 'Laravel'
  },
  {
    name: 'WooCommerce & WordPress Custom Theme',
    desc: 'A highly customized e-commerce WordPress theme with custom post types, Gutenberg blocks, and full WooCommerce integration.',
    tech: ['WordPress', 'PHP', 'JavaScript', 'CSS3'],
    link: 'https://github.com/jackeybharthi',
    category: 'WordPress'
  },
  {
    name: 'Myshop1 Mobile App',
    desc: 'A mobile client for e-commerce stores built using Java and Android SDK, featuring smooth checkout and product search.',
    tech: ['Java', 'Android SDK', 'REST APIs', 'SQLite'],
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
      { name: 'MySQL / PostgreSQL', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
    ]
  },
  {
    category: 'CMS, Mobile & Tools',
    items: [
      { name: 'WordPress Development', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg' },
      { name: 'React Native / Java', level: 'Advanced', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'GitHub Actions / Git', level: 'Expert', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
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

const handleSend = () => {
  if (name.value && email.value && message.value) {
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      formSubmitted.value = true
      name.value = ''
      email.value = ''
      message.value = ''
      setTimeout(() => {
        formSubmitted.value = false
      }, 5000)
    }, 1200)
  }
}
const mouseX = ref(0)
const mouseY = ref(0)
const cursorX = ref(-1000)
const cursorY = ref(-1000)
const particles = ref([])
const isDark = ref(true)

const handleMouseMove = (e) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 35
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 35
  cursorX.value = e.clientX
  cursorY.value = e.clientY
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.remove('light-theme')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.add('light-theme')
    localStorage.setItem('theme', 'light')
  }
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
      terminalLines.value.push({ text: 'Available commands:\n  about     - Learn more about me\n  skills    - Print key skills\n  contact   - Get email, phone and socials info\n  clear     - Clear the terminal screen', type: 'response' })
      break
    case 'about':
      terminalLines.value.push({ text: 'I am a Full-Stack Software Developer specializing in building high-performance web applications using Laravel, React, Vue, Next.js, and WordPress. Based in Ahmedabad.', type: 'response' })
      break
    case 'skills':
      terminalLines.value.push({ text: '=== Tech Stack ===\n* Laravel & PHP\n* WordPress & WooCommerce\n* React, Next.js, Vue\n* Node.js & REST APIs\n* MySQL, PostgreSQL, Android Java', type: 'response' })
      break
    case 'contact':
      terminalLines.value.push({ text: 'Email: jackey.bharthi@gmail.com\nWhatsApp: +91 82000 04544\nLocation: Ahmedabad, Gujarat, India\nLinkedIn: linkedin.com/in/jackeybharthi', type: 'response' })
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

const activeSection = ref('about')
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

const handleScroll = () => {
  const sections = ['about', 'experience', 'projects', 'skills', 'contact']
  const scrollPosition = window.scrollY + 120
  
  for (const sec of sections) {
    const el = document.getElementById(sec)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeSection.value = sec
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll)
  
  // Launch typing effect
  typeEffect()
  
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

  // Restore theme preference
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.classList.add('light-theme')
  } else {
    isDark.value = true
    document.documentElement.classList.remove('light-theme')
  }

  // Scroll Reveal Observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.08 })
  
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal')
    revealObserver.observe(section)
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
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
  <header>
    <a href="#" class="logo" style="display: flex; align-items: center; gap: 8px;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#logo-grad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a855f7" />
            <stop offset="100%" stop-color="#6366f1" />
          </linearGradient>
        </defs>
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
      <span>Jackey Bharthi</span>
    </a>
    <nav>
      <a href="#about" :class="{ active: activeSection === 'about' }">About</a>
      <a href="#experience" :class="{ active: activeSection === 'experience' }">Experience</a>
      <a href="#projects" :class="{ active: activeSection === 'projects' }">Projects</a>
      <a href="#skills" :class="{ active: activeSection === 'skills' }">Skills</a>
      <a href="#contact" :class="{ active: activeSection === 'contact' }">Contact</a>
      <button @click="toggleTheme" class="theme-toggle" aria-label="Toggle theme" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; font-size: 16px; margin-left: 12px; transition: color 0.3s; display: inline-flex; align-items: center;">
        <i :class="isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
      </button>
    </nav>
  </header>

  <main>
    <section class="hero-section">
      <div class="hero-content">
        <div class="badge">
          <span class="badge-dot"></span>
          Available for Web Dev roles
        </div>
        <h1 class="hero-title">
          Building high-performance,<br>
          <span style="display: inline-block; min-height: 48px; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">{{ typedText }}<span class="typed-cursor" style="color: var(--accent); margin-left: 4px; font-weight: 300;">|</span></span>
        </h1>
        <p class="hero-desc">
          I am a Full-Stack Developer at Skywave Info Solutions specializing in Laravel, WordPress, React, Next.js, and Node.js. 
          Focused on crafting premium user experiences that are fast, modern, and highly scalable.
        </p>
        <div class="cta-group">
          <a href="#projects" class="btn btn-primary">Explore Work</a>
          <a href="#contact" class="btn btn-secondary">Get in Touch</a>
        </div>
      </div>
      <div class="hero-image-wrapper">
        <div class="hero-orb" :style="{ transform: 'translate3d(' + (mouseX * -0.8) + 'px, ' + (mouseY * -0.8) + 'px, 0)' }"></div>
        <img src="https://jackeybharthi.wordpress.com/wp-content/uploads/2025/02/img_20231006_184007_619-edited-1.jpg" alt="Jackey Bharthi" class="profile-photo" :style="{ transform: 'translate3d(' + (mouseX * 0.4) + 'px, ' + (mouseY * 0.4) + 'px, 0)' }" />
      </div>
    </section>

    <div class="tech-marquee-container">
      <div class="tech-marquee-wrapper">
        <div class="tech-marquee-track">
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" alt="" /> Laravel</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="" /> WordPress</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="" /> React</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="" /> Next.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="" /> Vue.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="" /> Node.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="" /> PHP</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="" /> MySQL</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="" /> Git / GitHub</span>
        </div>
        <div class="tech-marquee-track">
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" alt="" /> Laravel</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="" /> WordPress</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="" /> React</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="" /> Next.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="" /> Vue.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="" /> Node.js</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="" /> PHP</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="" /> MySQL</span>
          <span class="marquee-item"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="" /> Git / GitHub</span>
        </div>
      </div>
    </div>

    <section id="about">
      <h2 class="section-title">About Me</h2>
      <div class="about-container">
        <div class="about-left" style="display: flex; flex-direction: column; gap: 24px;">
          <div class="about-text">
            <p>
              Hello! I'm Jackey, a passionate full-stack developer based in Ahmedabad, Gujarat. I specialize in building robust web applications and portals using **Laravel / PHP** and **Node.js** on the backend, and **React, Next.js, and Vue.js** on the frontend, alongside expert custom **WordPress** design and development. My work at Skywave Info Solutions revolves around developing performant client portals, custom WooCommerce themes, APIs, and cross-platform apps.
            </p>
            <p style="margin-top: 16px;">
              I enjoy bridging the gap between design and development — translating complex designs into clean, accessible, and responsive code. I'm always looking to learn new technologies and improve my engineering skills.
            </p>
          </div>
          <div class="about-stats-grid">
            <div class="stat-card" style="padding: 12px;">
              <span class="stat-num">4+</span>
              <span class="stat-label">Years Experience</span>
            </div>
            <div class="stat-card" style="padding: 12px;">
              <span class="stat-num">15+</span>
              <span class="stat-label">Projects Completed</span>
            </div>
            <div class="stat-card" style="padding: 12px;">
              <span class="stat-num">99%</span>
              <span class="stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
        <div class="about-right">
          <div class="mock-editor">
            <div class="editor-header">
              <div class="dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <span class="file-name">PortfolioController.php</span>
            </div>
            <pre class="code-content" style="font-family: var(--mono); margin: 0; padding: 16px; overflow-x: auto; font-size: 12px; line-height: 1.5;"><code><span class="keyword">namespace</span> App\Http\Controllers;

<span class="keyword">class</span> <span class="class-name">PortfolioController</span> {
    <span class="keyword">public function</span> <span class="function-name">getSkills</span>() {
        <span class="keyword">return</span> [
            <span class="string">'frontend'</span> => [<span class="string">'React'</span>, <span class="string">'Vue.js'</span>, <span class="string">'Next.js'</span>],
            <span class="keyword">'backend'</span>  => [<span class="string">'Laravel'</span>, <span class="string">'Node.js'</span>, <span class="string">'PHP'</span>],
            <span class="keyword">'cms'</span>      => [<span class="string">'WordPress'</span>, <span class="string">'WooCommerce'</span>],
            <span class="string">'database'</span> => [<span class="string">'MySQL'</span>, <span class="string">'PostgreSQL'</span>]
        ];
    }
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <section id="experience">
      <h2 class="section-title">Work Experience</h2>
      <div class="experience-timeline">
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-header">
            <div>
              <h3 class="role-title">Full-Stack Developer</h3>
              <span class="company-name">Skywave Info Solutions Pvt. Ltd.</span>
            </div>
            <span class="role-duration">2022 - Present</span>
          </div>
          <p class="role-desc">
            Develop responsive customer interfaces using React, Next.js, and Vue.js. Construct scalable backends, database models, and RESTful APIs using Laravel/PHP, MySQL, and Node.js. Build and deploy cross-platform mobile portals using React Native.
          </p>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-header">
            <div>
              <h3 class="role-title">Freelance Software Developer</h3>
              <span class="company-name">Freelancer.com</span>
            </div>
            <span class="role-duration">2020 - 2022</span>
          </div>
          <p class="role-desc">
            Created and hosted custom web applications and full-scale e-commerce digital storefronts using custom-coded WordPress themes and Laravel. Integrated payment processors, optimized site loading speeds, and managed server setups for overseas clients.
          </p>
        </div>
      </div>
    </section>

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
        <div v-for="project in filteredProjects" :key="project.name" class="project-card">
          <div class="project-tech">
            <span v-for="tech in project.tech" :key="tech" class="tech-tag" :style="{ color: getTechTagStyle(tech).color, background: getTechTagStyle(tech).bg }">{{ tech }}</span>
          </div>
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-desc">{{ project.desc }}</p>
          <a :href="project.link" target="_blank" class="project-link">
            View Repository
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <section id="skills">
      <h2 class="section-title">Skills & Expertise</h2>
      <div class="skills-container">
        <div v-for="cat in skills" :key="cat.category" class="skills-category">
          <h3>{{ cat.category }}</h3>
          <div class="skills-list">
            <div v-for="skill in cat.items" :key="skill.name" class="skill-item" style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
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
              <input type="text" v-model="terminalInput" class="terminal-input" placeholder="Type a command..." autofocus />
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
    <div style="color: var(--text-secondary); font-size: 13px; margin-top: 8px;">© 2026 Jackey Bharthi. All rights reserved.</div>
  </footer>
</template>
