  document.getElementById('year').textContent = new Date().getFullYear();
  const roles = [
    'Front-End Developer',
    'React Developer',
    'Next.js Developer',
    'UI Engineer'
  ];

  const typedEl = document.getElementById('typedRole');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typedEl) {
    if (reduceMotion) {
      typedEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const TYPE_SPEED = 80;
      const DELETE_SPEED = 45;
      const PAUSE_AFTER_TYPE = 1400;
      const PAUSE_AFTER_DELETE = 400;

      const tick = () => {
        const currentRole = roles[roleIndex];

        if (!deleting) {
          charIndex++;
          typedEl.textContent = currentRole.slice(0, charIndex);

          if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(tick, PAUSE_AFTER_TYPE);
            return;
          }
          setTimeout(tick, TYPE_SPEED);
        } else {
          charIndex--;
          typedEl.textContent = currentRole.slice(0, charIndex);

          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(tick, PAUSE_AFTER_DELETE);
            return;
          }
          setTimeout(tick, DELETE_SPEED);
        }
      };

      setTimeout(tick, TYPE_SPEED);
    }
  }

  
  const tabs = document.querySelectorAll('.tab');
  const sections = document.querySelectorAll('main section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('tabs').classList.remove('open');
    });
  });

  
  const setActive = () => {
    let current = sections[0].id;
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      if (scrollPos >= sec.offsetTop) current = sec.id;
    });
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.target === '#' + current);
    });
  };
  window.addEventListener('scroll', setActive);
  setActive();

  
  document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('tabs').classList.toggle('open');
  });

  
  const skillGrid = document.getElementById('skillGrid');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-card').forEach(card => {
          const level = card.dataset.level;
          card.querySelector('.bar i').style.width = level + '%';
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  io.observe(skillGrid);

  
  const CONTACT_EMAIL = 'aimen69khan@gmail.com';

  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const msgInput = document.getElementById('msgInput');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    const subject = `Portfolio contact from ${name}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`;

    const mailtoLink =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

      

    window.location.href = mailtoLink;

    formMsg.textContent = '✓ Opening your email app to send this to Ahmed...';
    formMsg.style.display = 'block';
    form.reset();
    setTimeout(() => formMsg.style.display = 'none', 5000);
  });