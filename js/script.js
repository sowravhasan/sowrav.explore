// Optimized Explore With Sowrav - Main JavaScript File
console.log("🌟 Explore With Sowrav - Website Loading...");

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  console.log("📦 DOM Content Loaded - Initializing features...");

  // Initialize core features
  initNavigation();
  initScrollAnimations();
  initAnimatedCounters();
  initNewsletterForm();
  initGalleryFilters();
  initCategoryCards();
  initLazyLoading();

  console.log("✅ All features initialized successfully!");
});

// Navigation functionality
function initNavigation() {
  console.log("🧭 Initializing navigation...");

  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      console.log("📱 Mobile menu toggled");
    });

    // Close mobile menu when clicking on links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
      });
    });
  }

  // Navbar scroll effect
  if (navbar) {
    window.addEventListener(
      "scroll",
      debounce(() => {
        if (window.scrollY > 100) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }, 10)
    );
  }

  // Active navigation link highlighting based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    let current = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      // Check if current scroll position is within this section
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    // Update active nav link
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");

      // Check if this link corresponds to current section
      if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Add scroll listener for active nav updates
  window.addEventListener("scroll", debounce(updateActiveNavLink, 50));

  // Initialize active state on page load
  updateActiveNavLink();

  // Smooth scroll for anchor links
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    }
  });

  console.log("✅ Navigation initialized");
}

// Animated counters for stats
function initAnimatedCounters() {
  console.log("🔢 Initializing animated counters...");

  const counters = document.querySelectorAll(".stat-number[data-count]");

  if (counters.length === 0) {
    console.log("ℹ️ No counters found");
    return;
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count"));
          animateCounter(counter, target);
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  console.log(`✅ ${counters.length} counters initialized`);
}

function animateCounter(element, target) {
  const duration = 2500; // Longer duration for smoother animation
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    // Smooth easing function (ease-out-cubic)
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(target * easeOutCubic);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

// Gallery filters functionality
function initGalleryFilters() {
  console.log("🎨 Initializing gallery filters...");

  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length === 0 || galleryItems.length === 0) {
    console.log("ℹ️ Gallery filters not found on this page");
    return;
  }

  // Ensure all items are visible initially
  galleryItems.forEach((item) => {
    item.style.display = "block";
    item.style.opacity = "1";
    item.style.transform = "scale(1)";
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");
      console.log(`🎯 Filtering gallery by: ${filterValue}`);

      // Filter items with smooth animation
      galleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute("data-category");
        const shouldShow =
          filterValue === "all" || itemCategory === filterValue;

        if (shouldShow) {
          item.style.display = "block";
          // Add small delay for staggered animation
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, index * 50);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Initialize lightbox for gallery items
  initGalleryLightbox();

  console.log(
    `✅ Gallery filters initialized with ${galleryItems.length} items`
  );
}

// Gallery lightbox functionality
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img) {
        openLightbox(img.src, img.alt);
      }
    });
  });
}

function openLightbox(imageSrc, imageAlt) {
  // Create lightbox
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="${imageAlt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;

  // Add styles
  lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  const content = lightbox.querySelector(".lightbox-content");
  content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;

  const img = lightbox.querySelector("img");
  img.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 10px;
    `;

  const closeBtn = lightbox.querySelector(".lightbox-close");
  closeBtn.style.cssText = `
        position: absolute;
        top: -15px;
        right: -15px;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;

  // Close functionality
  const closeLightbox = () => {
    lightbox.style.opacity = "0";
    setTimeout(() => {
      if (document.body.contains(lightbox)) {
        document.body.removeChild(lightbox);
      }
    }, 300);
    document.body.style.overflow = "auto";
  };

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // Show lightbox
  document.body.appendChild(lightbox);
  document.body.style.overflow = "hidden";

  // Animate in
  setTimeout(() => {
    lightbox.style.opacity = "1";
  }, 10);
}

// Newsletter form functionality
function initNewsletterForm() {
  console.log("📧 Initializing newsletter form...");

  const newsletterForm = document.getElementById("newsletter-form");

  if (!newsletterForm) {
    console.log("ℹ️ Newsletter form not found");
    return;
  }

  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;
    const submitBtn = newsletterForm.querySelector("button");
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = "📤 Subscribing...";
    submitBtn.disabled = true;

    // Simulate subscription (replace with actual API call)
    setTimeout(() => {
      showNotification("Thank you for subscribing! 🎉", "success");
      newsletterForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });

  console.log("✅ Newsletter form initialized");
}

// Category cards interaction
function initCategoryCards() {
  console.log("🏷️ Initializing category cards...");

  const categoryCards = document.querySelectorAll(".category-card");

  if (categoryCards.length === 0) {
    console.log("ℹ️ No category cards found");
    return;
  }

  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category");
      console.log(`📂 Category card clicked: ${category}`);

      // Scroll to gallery and filter
      const gallerySection = document.getElementById("gallery");
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: "smooth" });

        // Filter gallery after scrolling
        setTimeout(() => {
          const filterBtn = document.querySelector(
            `[data-filter="${category}"]`
          );
          if (filterBtn) {
            filterBtn.click();
          }
        }, 500);
      }
    });
  });

  console.log(`✅ ${categoryCards.length} category cards initialized`);
}

// Scroll animations
function initScrollAnimations() {
  console.log("🎬 Initializing scroll animations...");

  const animatedElements = document.querySelectorAll(
    ".category-card, .video-card, .social-card, .gallery-item, .expertise-card"
  );

  if (animatedElements.length === 0) {
    console.log("ℹ️ No animated elements found");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  console.log(
    `✅ ${animatedElements.length} elements set for scroll animation`
  );
}

// Lazy loading for images
function initLazyLoading() {
  console.log("🖼️ Initializing lazy loading...");

  const images = document.querySelectorAll('img[loading="lazy"]');

  if (images.length === 0) {
    console.log("ℹ️ No lazy loading images found");
    return;
  }

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          img.onload = () => {
            img.style.opacity = "1";
            img.classList.add("loaded");
          };

          img.onerror = () => {
            img.style.opacity = "0.5";
            img.alt = "Image not available";
            console.log(`⚠️ Failed to load image: ${img.src}`);
          };

          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
          } else if (img.src) {
            // For images that already have src, just ensure they're visible
            img.style.opacity = "1";
            img.classList.add("loaded");
          }

          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      imageObserver.observe(img);
      // If image is already loaded, show it immediately
      if (img.complete && img.naturalWidth > 0) {
        img.style.opacity = "1";
        img.classList.add("loaded");
      }
    });
    console.log(`✅ ${images.length} images set for lazy loading`);
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach((img) => {
      img.style.opacity = "1";
      img.classList.add("loaded");
    });
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.textContent = message;

  const bgColor = type === "success" ? "#2ECC71" : "#1FA2FF";
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 300px;
        font-weight: 500;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Utility function - debounce for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Error handling for missing images
document.addEventListener(
  "error",
  function (e) {
    if (e.target.tagName === "IMG") {
      e.target.style.display = "none";
      console.log(`⚠️ Image failed to load: ${e.target.src}`);
    }
  },
  true
);

// Console welcome message
console.log(`
🌟 Welcome to Explore With Sowrav!
🎬 Follow the journey: youtube.com/@sowrav.explore
📸 Daily adventures: instagram.com/sowrav.explore
🚀 Website optimized and ready!
`);

// Performance monitoring
window.addEventListener("load", () => {
  console.log("🚀 Page fully loaded!");
});
