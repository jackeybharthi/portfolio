<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Header from './Header.vue'
import { initTheme } from '../composables/useTheme'

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

onMounted(() => {
  initTheme()
  window.addEventListener('mousemove', handleMouseMove)

  // Initialize background particles
  for (let i = 0; i < 15; i++) {
    particles.value.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 10,
      duration: Math.random() * 15 + 10,
      opacity: Math.random() * 0.4 + 0.1
    })
  }

  // Scroll Reveal Observer with Stagger
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a slight stagger based on index for elements appearing together
        setTimeout(() => {
          entry.target.classList.add('visible')
        }, index * 100)
      }
    })
  }, { threshold: 0.1 })
  
  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
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
          transform: 'translate3d(' + (mouseX * (p.size * -0.15)) + 'px, ' + (mouseY * (p.size * -0.15)) + 'px, 0)'
        }"
      ></div>
    </div>
  </div>
  
  <Header activeSection="about" />

  <main class="about-page">
    <div class="about-hero">
      <h1 class="hero-title">Discover the <span style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Developer</span></h1>
      <p class="hero-desc" style="max-width: 600px; margin: 0 auto;">
        I am Jackey Bharthi, a Full-Stack Engineer who thrives on transforming complex problems into elegant, scalable web solutions. Based in Ahmedabad, Gujarat, I blend modern front-end aesthetics with rock-solid back-end architecture.
      </p>
    </div>

    <div class="about-bento-grid">
      <!-- Bio Card -->
      <div class="bento-card bento-bio reveal">
        <h3 style="font-size: 24px; margin-bottom: 16px; color: var(--text-primary);">My Journey</h3>
        <p style="color: var(--text-secondary); line-height: 1.7; font-size: 16px;">
          I specialize in building robust web applications using <strong>Laravel / PHP</strong> and <strong>Node.js</strong> on the backend, alongside modern frontend frameworks like <strong>React, Next.js, and Vue.js</strong>.
        </p>
        <p style="margin-top: 16px; color: var(--text-secondary); line-height: 1.7; font-size: 16px;">
          Currently, at <a href="https://www.skywaveinfosolutions.com/" target="_blank" style="color: var(--accent); text-decoration: none;">Skywave Info Solutions</a>, I focus on crafting performant client portals, cross-platform apps, and custom APIs that serve thousands of users. My goal is always to bridge the gap between stunning design and flawless engineering.
        </p>
      </div>

      <!-- Stats Card -->
      <div class="bento-card bento-stats reveal" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: var(--accent-glow); border-color: rgba(168, 85, 247, 0.3);">
        <span class="stat-num" style="font-size: 3rem; color: var(--accent); font-weight: 800;">4+</span>
        <span class="stat-label">Years of Professional Experience</span>
      </div>

      <div class="bento-card bento-stats reveal" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: rgba(56, 189, 248, 0.1); border-color: rgba(56, 189, 248, 0.3);">
        <span class="stat-num" style="font-size: 3rem; color: #38bdf8; font-weight: 800;">15+</span>
        <span class="stat-label">Enterprise Projects Delivered</span>
      </div>

      <!-- Code Card -->
      <div class="bento-card bento-code reveal">
        <div class="mock-editor" style="margin: 0; height: 100%;">
          <div class="editor-header">
            <div class="dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="file-name">PortfolioController.php</span>
          </div>
          <pre class="code-content" style="font-family: var(--mono); margin: 0; padding: 24px; overflow-x: auto; font-size: 14px; line-height: 1.6;"><code><span class="keyword">namespace</span> App\Http\Controllers;

<span class="keyword">class</span> <span class="class-name">PortfolioController</span> {
    <span class="keyword">public function</span> <span class="function-name">getSkills</span>() {
        <span class="keyword">return</span> [
            <span class="string">'frontend'</span> => [<span class="string">'React'</span>, <span class="string">'Vue.js'</span>, <span class="string">'Next.js'</span>],
            <span class="keyword">'backend'</span>  => [<span class="string">'Laravel'</span>, <span class="string">'Node.js'</span>, <span class="string">'Supabase'</span>],
            <span class="keyword">'cloud_ai'</span> => [<span class="string">'AWS'</span>, <span class="string">'n8n Automation'</span>],
            <span class="string">'database'</span> => [<span class="string">'MySQL'</span>, <span class="string">'PostgreSQL'</span>]
        ];
    }
}</code></pre>
        </div>
      </div>
      <!-- Experience Card -->
      <div id="experience" class="bento-card bento-exp reveal">
        <h3 style="font-size: 24px; margin-bottom: 24px; color: var(--text-primary);">Work Experience</h3>
        <div class="experience-timeline">
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-header">
              <div>
                <h3 class="role-title">Full-Stack Developer</h3>
                <span class="company-name"><a href="https://www.skywaveinfosolutions.com/" target="_blank" style="color: inherit; text-decoration: none;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">Skywave Info Solutions Pvt. Ltd.</a></span>
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
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-header">
              <div>
                <h3 class="role-title">Trainee Software Engineer</h3>
                <span class="company-name">Egrivory</span>
              </div>
              <span class="role-duration">Jan 2020 - Jun 2020</span>
            </div>
            <p class="role-desc">
              Worked as a trainee software engineer focusing on Odoo, an open-source ERP software framework.
            </p>
          </div>
        </div>
      </div>

      <!-- Education Card -->
      <div class="bento-card bento-edu reveal">
        <h3 style="font-size: 24px; margin-bottom: 24px; color: var(--text-primary);">Education</h3>
        <div class="experience-timeline">
          <div class="timeline-item">
            <div class="timeline-dot" style="background: var(--success); box-shadow: 0 0 10px var(--success);"></div>
            <div class="timeline-header">
              <div>
                <h3 class="role-title">Master of Computer Applications (MCA)</h3>
                <span class="company-name">Atmiya Institute of Technology & Science</span>
              </div>
              <span class="role-duration">Jan 2020 - Dec 2021</span>
            </div>
            <p class="role-desc">
              Grade: A. Mastered advanced computer and information sciences, along with skills like AJAX and the Bootstrap framework.
            </p>
          </div>
          <div class="timeline-item">
            <div class="timeline-dot" style="background: var(--success); box-shadow: 0 0 10px var(--success);"></div>
            <div class="timeline-header">
              <div>
                <h3 class="role-title">Bachelor of Computer Application (BCA)</h3>
                <span class="company-name">T.N. Rao Institute of Management Research & Technology</span>
              </div>
              <span class="role-duration">2017 - 2020</span>
            </div>
            <p class="role-desc">
              Grade: A. Studied Information Technology, building a strong foundation in core web technologies including HTML and HTML5.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.about-page {
  padding: 140px 20px 60px;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  z-index: 10;
}

.about-hero {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeUp 0.8s ease-out;
}

.about-bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 24px;
}

.bento-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
}

.bento-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.bento-card:hover::before {
  opacity: 1;
}

.bento-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px rgba(168, 85, 247, 0.15);
  border-color: var(--accent);
}

.bento-bio {
  grid-column: span 4;
}

.bento-stats {
  grid-column: span 2;
  padding: 30px;
}

.bento-code {
  grid-column: span 4;
  padding: 0;
  overflow: hidden;
}

.bento-code .mock-editor {
  border: none;
  box-shadow: none;
  border-radius: 20px;
}

.bento-edu, .bento-exp {
  grid-column: span 4;
}

@media (max-width: 768px) {
  .about-bento-grid {
    grid-template-columns: 1fr;
  }
  .bento-bio, .bento-stats, .bento-code, .bento-edu, .bento-exp {
    grid-column: span 1;
  }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
