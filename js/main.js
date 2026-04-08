// js/main.js

/* ====================================
   INITIALIZATION
   ==================================== */
AOS.init({
  once: true,
  offset: 100,
  duration: 800,
  easing: "ease-in-out",
});

/* ====================================
   DOM ELEMENTS
   ==================================== */
const DOM = {
  backToTop: document.getElementById("backToTop"),
  mobileMenu: document.getElementById("mobileMenuBtn"),
  mobileNav: document.getElementById("mobileNavMenu"),
  mobileGallery: document.getElementById("mobileGalleryBtn"),
  mobileGallerySub: document.getElementById("mobileGallerySub"),
  toast: document.getElementById("toast"),
  contactBtn: document.getElementById("contactUsBtn"),
  learnBtn: document.getElementById("learnMoreBtn"),
  callBtn: document.getElementById("callNowBtn"),
  subscribeForm: document.getElementById("subscribeForm"),
  emailInput: document.getElementById("emailInput"),
  successMsg: document.getElementById("newsletterSuccess"),
};

/* ====================================
   UTILITY FUNCTIONS
   ==================================== */
const showToast = (message, isError = false) => {
  if (!DOM.toast) return;

  DOM.toast.textContent = message;
  DOM.toast.classList.remove("opacity-0", "invisible");
  DOM.toast.classList.add("opacity-100", "visible");

  const addClass = isError ? "bg-red-600" : "bg-gray-800";
  const removeClass = isError ? "bg-gray-800" : "bg-red-600";
  
  DOM.toast.classList.add(addClass);
  DOM.toast.classList.remove(removeClass);

  setTimeout(() => {
    DOM.toast.classList.remove("opacity-100", "visible");
    DOM.toast.classList.add("opacity-0", "invisible");
  }, 3000);
};

const scrollToSection = (sectionId, message) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    if (message) showToast(message);
  }
};

/* ====================================
   BACK TO TOP BUTTON
   ==================================== */
window.addEventListener("scroll", () => {
  if (DOM.backToTop) {
    const isVisible = window.scrollY > 400;
    DOM.backToTop.classList.toggle("visible", isVisible);
    DOM.backToTop.classList.toggle("opacity-0", !isVisible);
    DOM.backToTop.classList.toggle("invisible", !isVisible);
  }
});

if (DOM.backToTop) {
  DOM.backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ====================================
   MOBILE MENU
   ==================================== */
if (DOM.mobileMenu && DOM.mobileNav) {
  DOM.mobileMenu.addEventListener("click", () => {
    DOM.mobileNav.classList.toggle("hidden");
  });
}

if (DOM.mobileGallery && DOM.mobileGallerySub) {
  DOM.mobileGallery.addEventListener("click", (e) => {
    e.preventDefault();
    DOM.mobileGallerySub.classList.toggle("hidden");
  });
}

const mobileLinks = document.querySelectorAll("#mobileNavMenu a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (DOM.mobileNav) DOM.mobileNav.classList.add("hidden");
  });
});

/* ====================================
   BUTTON INTERACTIONS
   ==================================== */
if (DOM.contactBtn) {
  DOM.contactBtn.addEventListener("click", () => {
    scrollToSection("contact", "📬 Scroll to contact section!");
  });
}

if (DOM.learnBtn) {
  DOM.learnBtn.addEventListener("click", () => {
    scrollToSection("about", "✨ Explore my journey & failures!");
  });
}

if (DOM.callBtn) {
  DOM.callBtn.addEventListener("click", () => {
    showToast("📞 Call us at +8801774085300");
  });
}

/* ====================================
   SUBSCRIBE FORM
   ==================================== */
if (DOM.subscribeForm && DOM.emailInput) {
  DOM.subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = DOM.emailInput.value.trim();
    const isValid = email && email.includes("@") && email.includes(".");

    if (!isValid) {
      showToast("❌ Please enter a valid email address!", true);
      return;
    }

    if (DOM.successMsg) DOM.successMsg.classList.remove("hidden");
    showToast("✅ Subscribed successfully! Thank you.");
    DOM.emailInput.value = "";

    setTimeout(() => {
      if (DOM.successMsg) DOM.successMsg.classList.add("hidden");
    }, 4000);
  });
}

/* ====================================
   STATS COUNTER ANIMATION
   ==================================== */
const animateNumbers = () => {
  const statNumbers = document.querySelectorAll(".stat-number");
  
  statNumbers.forEach((el) => {
    const target = parseInt(el.getAttribute("data-target"));
    if (isNaN(target)) return;

    let current = 0;
    const suffix = target === 85 ? "%" : "+";
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      
      if (step >= steps) {
        el.innerText = target + suffix;
        clearInterval(timer);
      } else {
        el.innerText = Math.floor(current) + suffix;
      }
    }, duration / steps);
  });
};

const statsContainer = document.querySelector(".grid-cols-3.gap-4.text-center");
if (statsContainer) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(statsContainer);
}

/* ====================================
   SMOOTH SCROLLING FOR ANCHOR LINKS
   ==================================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#" || href === "") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ====================================
   EXTERNAL LINKS SECURITY
   ==================================== */
document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.setAttribute("rel", "noopener noreferrer");
});