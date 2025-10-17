// Simple DOM helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// Typing effect for the element with class .typing-text
function typeEffect(el, text, speed = 100) {
  let i = 0;
  el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}

document.addEventListener('DOMContentLoaded', () => {
  // typing effect
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const txt = typingEl.textContent.trim();
    typeEffect(typingEl, txt, 100);
  }

  // highlight nav links when clicked
  const navLinks = $$('header nav a');
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      // if link targets an in-page id (href like #skills or #home), smooth-scroll and show that section
      const href = a.getAttribute('href');
      navLinks.forEach(x => x.classList.remove('active'));
      e.currentTarget.classList.add('active');

      if (href && href.startsWith('#')) {
        const id = href.slice(1);
        if (id) {
          const target = document.getElementById(id);
          if (target) {
            // hide other sections with an id
            const sections = Array.from(document.querySelectorAll('section[id]'));
            sections.forEach(s => {
              if (s.id === id) s.style.display = '';
              else s.style.display = 'none';
            });

            // smooth scroll to target
            target.scrollIntoView({behavior: 'smooth', block: 'start'});
            e.preventDefault();
          }
        }
      }
    });
  });

  // Back to top button
  const back = document.createElement('button');
  back.className = 'back-to-top';
  back.title = 'Back to top';
  back.innerHTML = '↑';
  back.style.cssText = 'position:fixed;right:18px;bottom:18px;padding:8px 10px;border-radius:6px;border:none;background:#111;color:#fff;cursor:pointer;display:none;z-index:999;';
  document.body.appendChild(back);

  back.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) back.style.display = 'block'; else back.style.display = 'none';
  });
});
