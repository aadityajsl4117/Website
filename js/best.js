/* ==================== MOBILE NAV ==================== */
function toggleMobileNav() {
  var nav = document.getElementById("mobileNav");
  var icon = document.getElementById("hamburgerIcon");
  nav.classList.toggle("open");
  icon.className = nav.classList.contains("open") ? "fas fa-times" : "fas fa-bars";
}

function closeMobileNav() {
  document.getElementById("mobileNav").classList.remove("open");
  document.getElementById("hamburgerIcon").className = "fas fa-bars";
}


/* ==================== SCROLL FADE-IN ==================== */
function revealOnScroll() {
  /* fade-up elements */
  document.querySelectorAll(".fade-up").forEach(function(el) {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
  /* service cards — staggered delay */
  document.querySelectorAll(".ser").forEach(function(card, i) {
    if (card.getBoundingClientRect().top < window.innerHeight - 80) {
      setTimeout(function() { card.classList.add("visible"); }, i * 100);
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load",   revealOnScroll);

/* ==================== SUBSCRIBE ==================== */
function handleSubscribe() {
  var email = document.getElementById("subscribeEmail").value.trim();
  var msg   = document.getElementById("subMsg");
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.style.display = "block";
    document.getElementById("subscribeEmail").value = "";
  } else {
    alert("Please enter a valid email address.");
  }
}

/* ==================== VALIDATION HELPERS ==================== */
function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

function isValidPhone(val) {
  return /^[6-9]\d{9}$/.test(val.replace(/\s/g, ""));
}

function setError(fieldId, errId, hasError) {
  var field = document.getElementById(fieldId);
  var err   = document.getElementById(errId);
  if (hasError) {
    field.classList.add("error");
    err.classList.add("show");
  } else {
    field.classList.remove("error");
    err.classList.remove("show");
  }
  return !hasError; /* returns true = valid */
}

/* Clear error as user types */
document.querySelectorAll("input, select, textarea").forEach(function(el) {
  el.addEventListener("input", function() {
    this.classList.remove("error");
    var errEl = document.getElementById(this.id + "Err");
    if (errEl) errEl.classList.remove("show");
  });
});

/* ==================== APPOINTMENT FORM ==================== */
document.getElementById("form").addEventListener("submit", function(e) {

  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let doctor = document.getElementById("doctor").value;
  let date = document.getElementById("date").value;
  let message = document.getElementById("message").value.trim();

  //  Empty validation
  if(name === "" || email === "" || phone === "" || doctor === "" || date === "") {
    alert("⚠ Please fill all required fields!");
    return;
  }

  // Phone validation (10 digits)
  if(phone.length !== 10 || isNaN(phone)) {
    alert("⚠ Enter valid 10-digit phone number!");
    return;
  }

  //  Email validation
  if(!email.includes("@") || !email.includes(".")) {
    alert("⚠ Enter valid email address!");
    return;
  }

  //Save data
  let data = { name, email, phone, doctor, date, message };
  localStorage.setItem("appointment", JSON.stringify(data));

  // Show success message
  let msg = document.getElementById("msg");
  msg.innerText = "✅ Thank you for choosing our team. We will contact you as soon as possible.";
  msg.style.display = "block";

  // Reset form
  this.reset();
});

/* ==================== CONTACT FORM ==================== */
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  var ok = true;

  var name = document.getElementById("cName").value.trim();
  if (!setError("cName", "cNameErr", name.length < 2)) ok = false;

  var email = document.getElementById("cEmail").value.trim();
  if (!setError("cEmail", "cEmailErr", !isValidEmail(email))) ok = false;

  var subject = document.getElementById("cSubject").value.trim();
  if (!setError("cSubject", "cSubjectErr", subject.length < 1)) ok = false;

  var message = document.getElementById("cMessage").value.trim();
  if (!setError("cMessage", "cMessageErr", message.length < 10)) ok = false;

  if (ok) {
    var successEl = document.getElementById("contactSuccess");
    successEl.classList.add("show");
    this.reset();
    setTimeout(function() { successEl.classList.remove("show"); }, 5000);
  }
});

/* ==================== TOUCH ANIMATION (MOBILE) ==================== */
document.querySelectorAll(".ser").forEach(function(card) {
  card.addEventListener("touchstart", function() { this.style.transform = "scale(0.97)"; });
  card.addEventListener("touchend",   function() { this.style.transform = ""; });
});