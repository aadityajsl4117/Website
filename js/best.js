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

  /*SIDE PANEL*/
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

  /*SCROLL FADE-IN*/
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

  /*SCROLL TO TOP BUTTON */
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

  /*
     FORM VALIDATION HELPERS*/
  document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); 

  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const subject = document.getElementById("cSubject").value.trim();
  const message = document.getElementById("cMessage").value.trim();

  const msgBox = document.getElementById("cMsg");


  if (name === "" || email === "" || subject === "" || message === "") {
    msgBox.innerText = "⚠ Please fill all fields!";
    msgBox.style.color = "red";
    msgBox.style.display = "block";
    return;
  }


  msgBox.innerText = "Message sent successfully!";
  msgBox.style.color = "green";
  msgBox.style.display = "block";


  this.reset();


  setTimeout(() => {
    msgBox.style.display = "none";
  }, 3000);
});
  
const form = document.getElementById("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const doctor = document.getElementById("doctor");
  const date = document.getElementById("date");


  document.querySelectorAll(".error").forEach(e => e.style.display = "none");
  document.querySelectorAll("input, select").forEach(i => i.classList.remove("error-border"));


  if (name.value.trim().length < 3) {
    showError(name, "nameErr", "Enter valid name");
    valid = false;
  }


  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    showError(email, "emailErr", "Enter valid email");
    valid = false;
  }

  if (!/^[6-9]\d{9}$/.test(phone.value)) {
    showError(phone, "phoneErr", "Enter valid 10-digit phone");
    valid = false;
  }

  if (doctor.value === "") {
    showError(doctor, "doctorErr", "Select doctor");
    valid = false;
  }


  const today = new Date().toISOString().split("T")[0];
  if (date.value === "" || date.value < today) {
    showError(date, "dateErr", "Select valid date");
    valid = false;
  }
  if (valid) {
    const msg = document.getElementById("msg");
    msg.innerText = "✅ Appointment booked successfully!";
    msg.style.color = "green";
    msg.style.display = "block";

    form.reset();
  }
});

function showError(input, errId, message) {
  document.getElementById(errId).innerText = message;
  document.getElementById(errId).style.display = "block";
  input.classList.add("error-border");
}
  /*CONTACT FORM
   */
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

  /* 
     TOUCH ANIMATION — service cards on mobile
 */
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
