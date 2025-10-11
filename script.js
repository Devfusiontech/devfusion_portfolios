// Basic interactive behaviors: menu toggle, smooth scroll, theme toggle, contact mock
document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menu toggle for small screens
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn && menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.alignItems = 'flex-start';
    navLinks.style.gap = '10px';
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  });

  // Theme toggle (dark / light) but default dark
  const btn = document.getElementById('themeToggle');
  btn && btn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    document.body.classList.toggle('dark');
    // invert some colors for simple light mode
    if (document.body.classList.contains('light')) {
      document.documentElement.style.setProperty('--bg', '#f7fbff');
      document.documentElement.style.setProperty('--text', '#071422');
      document.documentElement.style.setProperty('--muted', 'rgba(7,20,34,0.6)');
      document.documentElement.style.setProperty('--glass', 'rgba(3,7,12,0.03)');
    } else {
      document.documentElement.style.setProperty('--bg', '#0b0f14');
      document.documentElement.style.setProperty('--text', '#e6eef8');
      document.documentElement.style.setProperty('--muted', 'rgba(255,255,255,0.65)');
      document.documentElement.style.setProperty('--glass', 'rgba(255,255,255,0.03)');
    }
  });
});

// Contact form handler (simple local mock — replace with actual backend endpoint)
function handleContact(e){
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const result = document.getElementById('formResult');
  btn.disabled = true;
  btn.textContent = 'Sending...';

  // mock "send"
  setTimeout(() => {
    result.textContent = 'Thanks — your message has been recorded locally. I will reach out to you soon.';
    btn.disabled = false;
    btn.textContent = 'Send Message';
    e.target.reset();
  }, 900);
}
