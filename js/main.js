/* ===================================================================
   MAIN APPLICATION LOGIC
   Jay Ram Thakur - Cybersecurity Portfolio
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navbar = document.getElementById('navbar');

  if (navToggle && navLinks) {
    const closeMenu = () => {
      navLinks.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times', 'fa-xmark');
        icon.classList.add('fa-bars');
      }
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navLinks.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (isActive) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times', 'fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking any nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navbar.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu on ESC key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // 2. Navbar Scrolled Background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Dynamic Typewriter Effect
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    const roles = [
      "SOC Operations & Incident Response",
      "Vulnerability Assessment & VAPT",
      "Threat Detection & SIEM / SOAR",
      "Network Security & Defensive Ops",
      "Full-Stack MERN Development"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2200; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();
  }

  // 4. Skills Category Filtering
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Telemetry Number Counters
  const counters = document.querySelectorAll('.telemetry-num');
  let counted = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          const duration = 1600;
          const steps = 50;
          const stepValue = target / steps;
          let current = 0;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            current += stepValue;
            if (step >= steps) {
              counter.textContent = isDecimal ? target.toFixed(2) : Math.round(target);
              clearInterval(timer);
            } else {
              counter.textContent = isDecimal ? current.toFixed(2) : Math.round(current);
            }
          }, duration / steps);
        });
        counted = true;
      }
    });
  }, { threshold: 0.5 });

  const telemetrySection = document.querySelector('.telemetry-strip');
  if (telemetrySection) {
    countObserver.observe(telemetrySection);
  }

  // 6. Active Nav Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 7. Copy Details Utility
  const copyButtons = document.querySelectorAll('.copy-trigger');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text', err);
      }
    });
  });

  // 8. Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent = "Please fill in all required fields.";
          formStatus.style.color = "#ff3366";
        }
        return;
      }

      // Compose mailto as fallback and inform user
      const mailtoUrl = `mailto:jayt0667@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
      
      window.location.href = mailtoUrl;

      if (formStatus) {
        formStatus.innerHTML = `<span style="color:var(--accent-green);"><i class="fas fa-check-circle"></i> Opening email client to send message to Jay!</span>`;
      }
      contactForm.reset();
    });
  }

  // 9. Update Current Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
