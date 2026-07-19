<script setup>
import { ref } from 'vue'

const projects = ref([
  {
    name: 'Agentic AI Dev Studio',
    desc: 'An autonomous coding assistant platform that handles full-stack features, refactoring tasks, and testing flows using LLMs.',
    tech: ['Vue.js', 'Node.js', 'Gemini API', 'WebSockets'],
    link: 'https://github.com/jackeybharthi/agentic-dev-studio'
  },
  {
    name: 'Visual Shader Playground',
    desc: 'Interactive node-based visual graphics editor designed to build complex GLSL fragment shaders with real-time browser preview.',
    tech: ['TypeScript', 'Three.js', 'WebGL', 'CSS Grid'],
    link: 'https://github.com/jackeybharthi/shader-playground'
  },
  {
    name: 'Distributed KV Broker',
    desc: 'High throughput, low-latency in-memory data store featuring write-ahead logging, active clustering, and consistent hashing.',
    tech: ['Go', 'gRPC', 'Protobuf', 'Raft Consensus'],
    link: 'https://github.com/jackeybharthi/kv-broker'
  }
])

const skills = ref([
  {
    category: 'Frontend Engineering',
    items: [
      { name: 'Vue.js / Nuxt 3', level: 'Expert' },
      { name: 'JavaScript / TypeScript', level: 'Expert' },
      { name: 'Responsive Web / Vanilla CSS', level: 'Expert' }
    ]
  },
  {
    category: 'Backend & APIs',
    items: [
      { name: 'Node.js / Express', level: 'Advanced' },
      { name: 'Go / Python', level: 'Advanced' },
      { name: 'PostgreSQL / Redis', level: 'Advanced' }
    ]
  },
  {
    category: 'DevOps & Tooling',
    items: [
      { name: 'Docker / Containers', level: 'Advanced' },
      { name: 'GitHub Actions CI/CD', level: 'Expert' },
      { name: 'Vite / Build Tools', level: 'Expert' }
    ]
  }
])

const name = ref('')
const email = ref('')
const message = ref('')
const formSubmitted = ref(false)

const handleSend = () => {
  if (name.value && email.value && message.value) {
    formSubmitted.value = true
    name.value = ''
    email.value = ''
    message.value = ''
    setTimeout(() => {
      formSubmitted.value = false
    }, 5000)
  }
}
</script>

<template>
  <header>
    <a href="#" class="logo">Jackey Bharthi</a>
    <nav>
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section class="hero-section">
      <div class="badge">
        <span class="badge-dot"></span>
        Available for Web Dev roles
      </div>
      <h1 class="hero-title">
        Building high-performance,<br>
        <span>interactive web interfaces</span>
      </h1>
      <p class="hero-desc">
        I am a Web Developer specializing in Vue.js, clean styles, and robust systems integration. 
        Focused on crafting premium user experiences that are fast, accessible, and delight users.
      </p>
      <div class="cta-group">
        <a href="#projects" class="btn btn-primary">Explore Work</a>
        <a href="#contact" class="btn btn-secondary">Get in Touch</a>
      </div>
    </section>

    <section id="about">
      <h2 class="section-title">About Me</h2>
      <div class="about-container">
        <div class="about-text">
          <p>
            Hello! I'm Jackey, a passionate web developer focused on building interactive, highly performant web applications. My journey in web development started out of curiosity to understand how things work on the internet, which quickly turned into a professional career of crafting custom software.
          </p>
          <p style="margin-top: 16px;">
            I enjoy bridging the gap between design and development — translating complex designs into clean, accessible, and responsive code. I'm always looking to learn new technologies and improve my engineering skills.
          </p>
        </div>
        <div class="about-stats">
          <div class="stat-card">
            <span class="stat-num">3+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-card">
            <span class="stat-num">15+</span>
            <span class="stat-label">Projects Completed</span>
          </div>
          <div class="stat-card">
            <span class="stat-num">99%</span>
            <span class="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section>

    <section id="projects">
      <h2 class="section-title">Selected Projects</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.name" class="project-card">
          <div class="project-tech">
            <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
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
            <div v-for="skill in cat.items" :key="skill.name" class="skill-item">
              <span class="skill-name">{{ skill.name }}</span>
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
          Interested in working together or hiring me for your team? Shoot me a message and I'll get back to you within 24 hours.
        </p>
        
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
          <button type="submit" class="btn btn-primary" style="margin-top: 8px;">Send Message</button>
        </form>
      </div>
    </section>
  </main>

  <footer>
    <div>© 2026 Jackey Bharthi. All rights reserved.</div>
    <div>Built with Vue.js & Vite</div>
  </footer>
</template>
