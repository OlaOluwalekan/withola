export const handleScrollHelper = (cb: (val: string) => void) => {
  const sections = [
    'home',
    'terminal',
    'projects',
    'skills',
    'experience',
    'contact',
  ]
  const scrollPos = window.scrollY + 180

  for (const section of sections) {
    const el = document.getElementById(section)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPos >= top && scrollPos < top + height) {
        cb(section)
        break
      }
    }
  }
}
