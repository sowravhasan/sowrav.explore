// About page specific JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {
  initStatsCounter();
  initTimelineAnimations();
  initSkillsAnimations();
});

// Animated counters for statistics
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number");
  const options = {
    threshold: 0.7,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, options);

  statNumbers.forEach((stat) => {
    observer.observe(stat);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 seconds
  const start = performance.now();
  const startValue = 0;

  function updateCounter(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(
      startValue + (target - startValue) * easeOutQuart
    );

    // Format numbers with commas for large numbers
    element.textContent = formatNumber(currentValue);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = formatNumber(target);
    }
  }

  requestAnimationFrame(updateCounter);
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Timeline animations
function initTimelineAnimations() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const options = {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, options);

  timelineItems.forEach((item, index) => {
    // Initial state
    item.style.opacity = "0";
    item.style.transform = "translateY(50px)";
    item.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;

    observer.observe(item);
  });
}

// Skills section animations
function initSkillsAnimations() {
  const skillCards = document.querySelectorAll(".skill-card");
  const options = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Animate skill specialties
        const specialties = entry.target.querySelectorAll(
          ".skill-specialties span"
        );
        specialties.forEach((specialty, index) => {
          setTimeout(() => {
            specialty.style.opacity = "1";
            specialty.style.transform = "scale(1)";
          }, index * 100);
        });
      }
    });
  }, options);

  skillCards.forEach((card, index) => {
    // Initial state
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;

    // Initial state for specialties
    const specialties = card.querySelectorAll(".skill-specialties span");
    specialties.forEach((specialty) => {
      specialty.style.opacity = "0";
      specialty.style.transform = "scale(0.8)";
      specialty.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    });

    observer.observe(card);
  });
}

// Smooth reveal animation for value cards
function initValueCardAnimations() {
  const valueCards = document.querySelectorAll(".value-card");
  const options = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0) scale(1)";
      }
    });
  }, options);

  valueCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px) scale(0.95)";
    card.style.transition = `opacity 0.5s ease ${
      index * 0.1
    }s, transform 0.5s ease ${index * 0.1}s`;

    observer.observe(card);
  });
}

// Parallax effect for hero section
function initParallaxEffect() {
  const heroSection = document.querySelector(".about-hero");

  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      const heroBackground = heroSection.querySelector(".hero-background img");
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
      }
    });
  }
}

// Add hover effects to timeline items
function initTimelineHoverEffects() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {
    const content = item.querySelector(".timeline-content");

    item.addEventListener("mouseenter", () => {
      content.style.transform = "scale(1.02)";
      content.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.15)";
    });

    item.addEventListener("mouseleave", () => {
      content.style.transform = "scale(1)";
      content.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
    });
  });
}

// Lazy load images with fade-in effect
function initImageLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = "0";
          img.style.transition = "opacity 0.5s ease";

          img.onload = () => {
            img.style.opacity = "1";
          };

          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          }

          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize all animations when page loads
document.addEventListener("DOMContentLoaded", function () {
  initValueCardAnimations();
  initParallaxEffect();
  initTimelineHoverEffects();
  initImageLazyLoading();
});

// Add typing effect for the hero subtitle
function initTypingEffect() {
  const subtitle = document.querySelector(".about-hero .hero-content p");

  if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = "";
    subtitle.style.borderRight = "2px solid var(--sky-blue)";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
          subtitle.style.borderRight = "none";
        }, 1000);
      }
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
  }
}

// Add scroll progress indicator
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, var(--sky-blue), var(--emerald-green));
        z-index: 1000;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = scrollPercentage + "%";
  });
}

// Add floating social share buttons
function initFloatingSocial() {
  const floatingContainer = document.createElement("div");
  floatingContainer.className = "floating-social";
  floatingContainer.innerHTML = `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href
        )}" target="_blank" title="Share on Facebook">
            <i class="fab fa-facebook"></i>
        </a>
        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(
          window.location.href
        )}&text=Check out Sowrav's story!" target="_blank" title="Share on Twitter">
            <i class="fab fa-twitter"></i>
        </a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          window.location.href
        )}" target="_blank" title="Share on LinkedIn">
            <i class="fab fa-linkedin"></i>
        </a>
        <a href="mailto:?subject=Check out this amazing story&body=${encodeURIComponent(
          window.location.href
        )}" title="Share via Email">
            <i class="fas fa-envelope"></i>
        </a>
    `;

  floatingContainer.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  // Style individual buttons
  const buttons = floatingContainer.querySelectorAll("a");
  buttons.forEach((button) => {
    button.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            background: var(--white);
            color: var(--midnight-blue);
            border-radius: 50%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            text-decoration: none;
        `;

    button.addEventListener("mouseenter", () => {
      button.style.transform = "scale(1.1)";
      button.style.color = "var(--sky-blue)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "scale(1)";
      button.style.color = "var(--midnight-blue)";
    });
  });

  document.body.appendChild(floatingContainer);

  // Show/hide based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      floatingContainer.style.opacity = "1";
    } else {
      floatingContainer.style.opacity = "0";
    }
  });
}

// Initialize additional features
document.addEventListener("DOMContentLoaded", function () {
  initTypingEffect();
  initScrollProgress();
  initFloatingSocial();
});

// Add smooth transitions when navigating between sections
function initSmoothNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

// Initialize smooth navigation
initSmoothNavigation();
