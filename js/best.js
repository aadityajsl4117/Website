var mobileNavOpen = false;

  function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen;
    var nav     = document.getElementById('mobileNav');
    var overlay = document.getElementById('navOverlay');
    var icon    = document.getElementById('hamburgerIcon');
    var btn     = document.getElementById('hamburgerBtn');

    if (mobileNavOpen) {
      nav.classList.add('open');
      overlay.classList.add('active');
      icon.className = 'fas fa-times';
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // prevent scroll behind nav
    } else {
      closeMobileNav();
    }
  }

  function closeMobileNav() {
    mobileNavOpen = false;
    var nav     = document.getElementById('mobileNav');
    var overlay = document.getElementById('navOverlay');
    var icon    = document.getElementById('hamburgerIcon');
    var btn     = document.getElementById('hamburgerBtn');

    nav.classList.remove('open');
    overlay.classList.remove('active');
    icon.className = 'fas fa-bars';
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // restore scroll
  }

  /* Close mobile nav on ESC key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMobileNav();
      closePanel();
    }
  });

  /* =========================================================
     SIDE PANEL
  ========================================================= */
  function openPanel() {
    document.getElementById('sideMenu').classList.add('open');
    document.getElementById('panelOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closePanel() {
    document.getElementById('sideMenu').classList.remove('open');
    document.getElementById('panelOverlay').classList.remove('active');
    document.body.style.overflow = '';
  }
  function showText(item) {
    document.querySelectorAll('.menuItem').forEach(function(i) {
      if (i !== item) i.classList.remove('open');
    });
    item.classList.toggle('open');
  }

  /* =========================================================
     SCROLL FADE-IN
  ========================================================= */
  function revealOnScroll() {
    document.querySelectorAll('.fade-up').forEach(function(el) {
      if (el.getBoundingClientRect().top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
    document.querySelectorAll('.ser').forEach(function(card, i) {
      if (card.getBoundingClientRect().top < window.innerHeight - 80) {
        setTimeout(function() { card.classList.add('visible'); }, i * 100);
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('load',   revealOnScroll);

  /* =========================================================
     SCROLL TO TOP BUTTON
  ========================================================= */
  var scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* =========================================================
     SUBSCRIBE
  ========================================================= */
  function handleSubscribe() {
    var email = document.getElementById('subscribeEmail').value.trim();
    var msg   = document.getElementById('subMsg');
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.style.display = 'block';
      document.getElementById('subscribeEmail').value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  }

  /* =========================================================
     FORM VALIDATION HELPERS
  ========================================================= */
  function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isValidPhone(v) { return /^[6-9]\d{9}$/.test(v.replace(/\s/g, '')); }

  function setError(fieldId, errId, hasError) {
    var f = document.getElementById(fieldId);
    var e = document.getElementById(errId);
    if (hasError) {
      f.classList.add('error');
      e.classList.add('show');
    } else {
      f.classList.remove('error');
      e.classList.remove('show');
    }
    return !hasError;
  }

  /* Clear error as user types */
  document.querySelectorAll('input, select, textarea').forEach(function(el) {
    el.addEventListener('input', function() {
      this.classList.remove('error');
      var errEl = document.getElementById(this.id + 'Err');
      if (errEl) errEl.classList.remove('show');
    });
  });

  /* =========================================================
     APPOINTMENT FORM
  ========================================================= */
  document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var ok = true;

    var name = document.getElementById('bName').value.trim();
    if (!setError('bName', 'bNameErr', name.length < 2))   ok = false;

    var email = document.getElementById('bEmail').value.trim();
    if (!setError('bEmail', 'bEmailErr', !isValidEmail(email))) ok = false;

    var phone = document.getElementById('bPhone').value.trim();
    if (!setError('bPhone', 'bPhoneErr', !isValidPhone(phone))) ok = false;

    var doctor = document.getElementById('bDoctor').value;
    if (!setError('bDoctor', 'bDoctorErr', !doctor))        ok = false;

    var dateVal = document.getElementById('bDate').value;
    var today   = new Date(); today.setHours(0, 0, 0, 0);
    if (!setError('bDate', 'bDateErr', !dateVal || new Date(dateVal) <= today)) ok = false;

    if (ok) {
      localStorage.setItem('hospitalAppointment', JSON.stringify({
        name:    name,
        email:   email,
        phone:   phone,
        doctor:  doctor,
        date:    dateVal,
        message: document.getElementById('bMessage').value.trim()
      }));
      var s = document.getElementById('bookSuccess');
      s.classList.add('show');
      this.reset();
      setTimeout(function() { s.classList.remove('show'); }, 5000);
    }
  });

  /* =========================================================
     CONTACT FORM
  ========================================================= */
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var ok = true;

    var name = document.getElementById('cName').value.trim();
    if (!setError('cName', 'cNameErr', name.length < 2))    ok = false;

    var email = document.getElementById('cEmail').value.trim();
    if (!setError('cEmail', 'cEmailErr', !isValidEmail(email))) ok = false;

    var subj = document.getElementById('cSubject').value.trim();
    if (!setError('cSubject', 'cSubjectErr', subj.length < 1)) ok = false;

    var msg = document.getElementById('cMessage').value.trim();
    if (!setError('cMessage', 'cMessageErr', msg.length < 10)) ok = false;

    if (ok) {
      var s = document.getElementById('contactSuccess');
      s.classList.add('show');
      this.reset();
      setTimeout(function() { s.classList.remove('show'); }, 5000);
    }
  });

  /* =========================================================
     TOUCH ANIMATION — service cards on mobile
  ========================================================= */
  document.querySelectorAll('.ser').forEach(function(card) {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.97)';
    }, { passive: true });
    card.addEventListener('touchend', function() {
      this.style.transform = '';
    }, { passive: true });
  });
const cards = document.querySelectorAll('.feature-glass-card');

let currentIndex = 0;



function rotateCards() {

    cards.forEach(card => card.classList.remove('active'));

    cards[currentIndex].classList.add('active');

    currentIndex = (currentIndex + 1) % cards.length;

}
