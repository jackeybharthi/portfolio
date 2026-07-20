import { ref } from 'vue'

export const isDark = ref(true)

export function toggleTheme() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.remove('light-theme')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.add('light-theme')
    localStorage.setItem('theme', 'light')
  }
}

export function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.classList.add('light-theme')
  } else {
    isDark.value = true
    document.documentElement.classList.remove('light-theme')
  }
}
