// ── CUSTOM CURSOR ──────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (finePointer.matches && !reducedMotion.matches && cursor && cursorRing) {
  document.body.classList.add('custom-cursor-active');

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  function animCursor() {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  requestAnimationFrame(animCursor);

  document.querySelectorAll('a,button,.proj-item,.uiux-cell,.cert-cell').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      cursorRing.style.width = '52px';
      cursorRing.style.height = '52px';
      cursorRing.style.borderColor = 'rgba(255,255,255,.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      cursorRing.style.width = '36px';
      cursorRing.style.height = '36px';
      cursorRing.style.borderColor = 'rgba(255,255,255,.35)';
    });
  });
}

// ── EXPERIENCE ─────────────────────────────────
const flutterStart = new Date('2025-10-01T00:00:00');
const now = new Date();
let months = (now.getFullYear() - flutterStart.getFullYear()) * 12 +
  (now.getMonth() - flutterStart.getMonth());
if (now.getDate() < flutterStart.getDate()) months--;
months = Math.max(0, months);

const experienceValue = document.getElementById('experienceValue');
const experienceUnit = document.getElementById('experienceUnit');
const flutterExperience = document.getElementById('flutterExperience');

if (months >= 12) {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (experienceValue) experienceValue.textContent = years;
  if (experienceUnit) experienceUnit.textContent = years === 1 ? 'yr' : 'yrs';
  if (flutterExperience) flutterExperience.textContent =
    remainder ? `${years} yr ${remainder} mo` : `${years} yr${years > 1 ? 's' : ''}`;
} else {
  if (experienceValue) experienceValue.textContent = months;
  if (experienceUnit) experienceUnit.textContent = 'mo';
  if (flutterExperience) flutterExperience.textContent = `${months} months`;
}

// ── SCROLL REVEAL ──────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.06 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── NUMBER COUNT ───────────────────────────────
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = +el.dataset.target;

      if (reducedMotion.matches) {
        el.textContent = target;
        countObserver.unobserve(el);
        return;
      }

      let cur = 0;
      const step = Math.ceil(target / 40);
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(t);
      }, 40);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.count-num').forEach(el => countObserver.observe(el));

// ── NAV TOGGLE (mobile) ────────────────────────
const navToggle = document.getElementById('navToggle');
const navPill = document.getElementById('navPill');

function closeNav() {
  navPill.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.querySelectorAll('span').forEach(s => s.style.transform = '');
}

navToggle?.addEventListener('click', () => {
  const isOpen = navPill.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  const spans = navToggle.querySelectorAll('span');

  if (isOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    closeNav();
  }
});

navPill?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// ── NAV SCROLL STYLE ───────────────────────────
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(5,5,5,.92)';
    nav.style.backdropFilter = 'blur(24px)';
    nav.style.borderBottom = '1px solid rgba(255,255,255,.06)';
  } else {
    nav.style.background = '';
    nav.style.backdropFilter = '';
    nav.style.borderBottom = '';
  }
}, { passive: true });
