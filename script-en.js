const body = document.body;
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('img');
const closeBtn = lightbox?.querySelector('button');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const progressBar = document.querySelector('.scroll-progress span');

function setMenu(open) {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navLinks.classList.toggle('is-open', open);
  body.classList.toggle('menu-open', open);
}

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

navItems.forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

function openLightbox(img) {
  if (!lightbox || !lightboxImg || !closeBtn) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('show');
  body.classList.add('menu-open');
  closeBtn.focus();
}

function closeLightbox() {
  if (!lightbox || !lightboxImg) return;
  lightbox.classList.remove('show');
  lightboxImg.src = '';
  body.classList.remove('menu-open');
}

document.querySelectorAll('.work-card img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img));
});

closeBtn?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeLightbox();
    setMenu(false);
  }
});

function updateScrollProgress() {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

const sections = [...document.querySelectorAll('main > section[id], main > section[data-nav]')];
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.dataset.nav || entry.target.id;
      navItems.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => navObserver.observe(section));
}

function normalizePhoneNumber(value) {
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const normalized = String(value || '').trim().replace(/[٠-٩۰-۹]/g, digit => {
    const arabicIndex = arabicDigits.indexOf(digit);
    return String(arabicIndex >= 0 ? arabicIndex : persianDigits.indexOf(digit));
  });

  return normalized.replace(/\D/g, '').slice(0, 11);
}

function isValidEgyptianMobile(value) {
  return /^01[0125]\d{8}$/.test(normalizePhoneNumber(value));
}

function formatEgyptianMobile(value) {
  return normalizePhoneNumber(value);
}

document.querySelectorAll('[data-lead-form]').forEach(form => {
  const phoneInput = form.querySelector('[name="phone"]');
  phoneInput?.addEventListener('input', () => {
    phoneInput.value = normalizePhoneNumber(phoneInput.value);
    phoneInput.classList.toggle('is-invalid', Boolean(phoneInput.value) && !isValidEgyptianMobile(phoneInput.value));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const nameInput = form.querySelector('[name="name"]');
    const name = String(formData.get('name') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const validPhone = isValidEgyptianMobile(phone);
    const formattedPhone = formatEgyptianMobile(phone);
    const error = form.querySelector('[data-lead-error]');
    const hasError = !name || !validPhone;

    nameInput?.classList.toggle('is-invalid', !name);
    phoneInput?.classList.toggle('is-invalid', !validPhone);
    if (error) {
      error.hidden = !hasError;
      error.textContent = !name
        ? 'Please write your name and mobile number.'
        : 'Please write a valid Egyptian mobile number such as 01012345678.';
    }

    if (hasError) {
      (!name ? nameInput : phoneInput)?.focus();
      return;
    }

    const message = [
      'Hello Ayman, I would like to request a website design quote.',
      `Name: ${name}`,
      `Mobile number: ${formattedPhone}`,
      `Service: ${formData.get('service') || 'Not decided yet'}`,
      `Budget: ${formData.get('budget') || 'Not specified'}`,
      `Project details: ${String(formData.get('message') || '').trim() || 'No additional details'}`
    ].join('\n');

    form.classList.add('is-sent');
    const whatsapp = form.dataset.whatsapp;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
});

const portfolioCards = document.querySelectorAll('.portfolio-grid-enhanced .work-card');
if ('IntersectionObserver' in window) {
  const portfolioObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        portfolioObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .18 });
  portfolioCards.forEach(card => portfolioObserver.observe(card));
} else {
  portfolioCards.forEach(card => card.classList.add('is-visible'));
}
