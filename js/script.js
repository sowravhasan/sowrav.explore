// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initGallery();
  initNewsletterForm();
  initScrollAnimations();
  initCategoryCards();
  initVideoLazyLoading();
  initAnimatedCounters();
  initParallaxEffects();
  // initTypingEffect(); // Disabled typing animation
});

// Enhanced Navigation functionality
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbar = document.querySelector(".navbar");

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Enhanced navbar scroll effect
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

  // Active nav link highlighting for single-page sections
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener(
    "scroll",
    debounce(() => {
      let current = "home"; // Default to home

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
        if (
          href === `#${current}` ||
          (current === "home" && href === "#home")
        ) {
          link.classList.add("active");
        }
      });
    }, 50)
  );

  // Smooth scroll for anchor links
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    // Only add smooth scroll for anchor links (starting with #)
    if (href.startsWith("#")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      });
    }
  });
}

// Animated Counters
function initAnimatedCounters() {
  const counters = document.querySelectorAll(".stat-number[data-count]");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-count"));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;

          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".parallax-element");

  window.addEventListener(
    "scroll",
    debounce(() => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 10)
  );
}

// Typing Effect for Hero Title
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.style.opacity = "1";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing effect after page load
  setTimeout(typeWriter, 1000);
}

// Gallery functionality - Complete rewrite for reliable filtering
function initGallery() {
  console.log('🎨 Gallery: Starting initialization...');
  
  // Use a longer delay to ensure everything is loaded
  setTimeout(() => {
    try {
      // Get DOM elements
      const galleryContainer = document.getElementById("gallery-main");
      const filterButtons = document.querySelectorAll(".filter-btn");
      const galleryItems = document.querySelectorAll(".gallery-item");

      // Validation
      if (!galleryContainer) {
        console.error('❌ Gallery container not found!');
        return;
      }
      
      if (filterButtons.length === 0) {
        console.error('❌ No filter buttons found!');
        return;
      }
      
      if (galleryItems.length === 0) {
        console.error('❌ No gallery items found!');
        return;
      }

      console.log('✅ Elements found:');
      console.log(`   Gallery container: ${galleryContainer.id}`);
      console.log(`   Filter buttons: ${filterButtons.length}`);
      console.log(`   Gallery items: ${galleryItems.length}`);

      // Log categories for debugging
      const foundCategories = new Set();
      galleryItems.forEach((item, index) => {
        const category = item.getAttribute("data-category");
        console.log(`   Item ${index}: category="${category}"`);
        if (category) foundCategories.add(category);
      });
      console.log(`   Available categories: ${Array.from(foundCategories).join(', ')}`);

      // Set up filtering
      filterButtons.forEach((button, buttonIndex) => {
        const filterValue = button.getAttribute("data-filter");
        console.log(`🔘 Setting up button ${buttonIndex}: "${filterValue}"`);
        
        // Remove any existing event listeners
        button.replaceWith(button.cloneNode(true));
      });

      // Re-get buttons after cloning (to remove old listeners)
      const cleanFilterButtons = document.querySelectorAll(".filter-btn");
      
      cleanFilterButtons.forEach((button) => {
        button.addEventListener('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          
          const filterValue = this.getAttribute("data-filter");
          console.log(`🎯 Filter clicked: "${filterValue}"`);

          // Update button states
          cleanFilterButtons.forEach(btn => {
            btn.classList.remove("active");
            console.log(`   Removed active from: ${btn.getAttribute("data-filter")}`);
          });
          
          this.classList.add("active");
          console.log(`   ✅ Added active to: ${filterValue}`);

          // Filter items
          let visibleCount = 0;
          let hiddenCount = 0;

          galleryItems.forEach((item, itemIndex) => {
            const itemCategory = item.getAttribute("data-category");
            const shouldShow = (filterValue === "all") || (itemCategory === filterValue);
            
            if (shouldShow) {
              // Show item
              item.style.display = "block";
              item.classList.remove("hidden");
              visibleCount++;
              console.log(`   👁️ Showing item ${itemIndex} (category: ${itemCategory})`);
            } else {
              // Hide item
              item.style.display = "none";
              item.classList.add("hidden");
              hiddenCount++;
              console.log(`   🙈 Hiding item ${itemIndex} (category: ${itemCategory})`);
            }
          });

          console.log(`📊 Result: ${visibleCount} shown, ${hiddenCount} hidden`);
          
          // Update container class for CSS styling
          if (filterValue === "all") {
            galleryContainer.classList.remove("filtered");
          } else {
            galleryContainer.classList.add("filtered");
          }
        });
      });

      // Initialize with "All" filter
      const allButton = document.querySelector('.filter-btn[data-filter="all"]');
      if (allButton) {
        console.log('🔄 Triggering initial "All" filter...');
        allButton.click();
      }

      // Set up lightbox functionality
      setupGalleryLightbox();

      console.log('✅ Gallery initialization completed successfully!');
      
    } catch (error) {
      console.error('❌ Gallery initialization error:', error);
    }
  }, 500); // Increased delay
}

// Separate lightbox function
function setupGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  
  galleryItems.forEach((item) => {
    // Click on view button
    const viewBtn = item.querySelector(".gallery-view");
    if (viewBtn) {
      viewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const imageSrc = viewBtn.getAttribute("data-image");
        if (imageSrc) {
          console.log(`🖼️ Opening lightbox: ${imageSrc}`);
          openLightbox(imageSrc);
        }
      });
    }

    // Click on entire item
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img) {
        console.log(`🖼️ Opening lightbox from item: ${img.src}`);
        openLightbox(img.src);
      }
    });
  });
}
}

  // Gallery lightbox functionality
  const viewBtns = document.querySelectorAll(".gallery-view");
  viewBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const imageSrc = btn.getAttribute("data-image");
      openLightbox(imageSrc);
    });
  });

  // Click on gallery item to open lightbox
  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img) {
        openLightbox(img.src);
      }
    });
  });
}

// Lightbox functionality
function openLightbox(imageSrc) {
  // Create lightbox if it doesn't exist
  let lightbox = document.getElementById("gallery-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "gallery-lightbox";
    lightbox.innerHTML = `
      <div class="lightbox-overlay">
        <div class="lightbox-content">
          <img src="" alt="Gallery Image" id="lightbox-image">
          <button class="lightbox-close">&times;</button>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Add lightbox styles
    const style = document.createElement("style");
    style.textContent = `
      #gallery-lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: none;
      }
      .lightbox-overlay {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
      }
      #lightbox-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 10px;
      }
      .lightbox-close {
        position: absolute;
        top: -10px;
        right: -10px;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
      .lightbox-close:hover {
        background: #f0f0f0;
      }
    `;
    document.head.appendChild(style);

    // Close lightbox events
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-overlay").addEventListener("click", (e) => {
      if (e.target === e.currentTarget) closeLightbox();
    });
    
    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.style.display === "block") {
        closeLightbox();
      }
    });
  }

  // Set image and show lightbox
  const lightboxImage = lightbox.querySelector("#lightbox-image");
  lightboxImage.src = imageSrc;
  lightbox.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  if (lightbox) {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
}
                    <p>${item.caption}</p>
                </div>
            `;

      // Add click event for lightbox
      galleryItem.addEventListener("click", () => {
        openLightbox(item);
      });

      galleryGrid.appendChild(galleryItem);
    });
  }

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");
      let filteredItems;

      if (filter === "all") {
        filteredItems = galleryData;
      } else {
        filteredItems = galleryData.filter((item) => item.category === filter);
      }

      renderGallery(filteredItems);
    });
  });

  // Initial render
  renderGallery(galleryData.slice(0, 8)); // Show first 8 items on homepage
}

// Lightbox functionality
function openLightbox(item) {
  // Create lightbox overlay
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox-overlay";
  lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${item.image}" alt="${item.caption}">
            <div class="lightbox-caption">
                <p>${item.caption}</p>
            </div>
        </div>
    `;

  // Add lightbox styles
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
    `;

  const content = lightbox.querySelector(".lightbox-content");
  content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;

  const img = lightbox.querySelector("img");
  img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
    `;

  const close = lightbox.querySelector(".lightbox-close");
  close.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 2rem;
        color: white;
        cursor: pointer;
        font-weight: bold;
    `;

  const caption = lightbox.querySelector(".lightbox-caption");
  caption.style.cssText = `
        color: white;
        margin-top: 1rem;
        font-size: 1.1rem;
    `;

  // Close functionality
  const closeLightbox = () => {
    document.body.removeChild(lightbox);
    document.body.style.overflow = "auto";
  };

  close.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Prevent body scroll
  document.body.style.overflow = "hidden";
  document.body.appendChild(lightbox);
}

// Newsletter form functionality
function initNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = newsletterForm.querySelector('input[type="email"]').value;
      const submitBtn = newsletterForm.querySelector("button");
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<span class="loading"></span> Subscribing...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Show success message
        showNotification(
          "Thank you for subscribing! Check your email for confirmation.",
          "success"
        );

        // Reset form
        newsletterForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#2ECC71" : "#1FA2FF"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 300px;
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

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements that should animate
  const animatedElements = document.querySelectorAll(
    ".category-card, .video-card, .social-card, .gallery-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Category cards interaction
function initCategoryCards() {
  const categoryCards = document.querySelectorAll(".category-card");

  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.getAttribute("data-category");
      // Navigate to gallery page with filter
      window.location.href = `gallery.html?filter=${category}`;
    });
  });
}

// Video lazy loading
function initVideoLazyLoading() {
  const videoCards = document.querySelectorAll(".video-card");

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframe = entry.target.querySelector("iframe");
        if (iframe && !iframe.src) {
          // Load video when it comes into view
          const videoId = iframe.getAttribute("data-video-id");
          if (videoId) {
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
          }
        }
      }
    });
  });

  videoCards.forEach((card) => {
    videoObserver.observe(card);
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Social media feed integration (placeholder functions)
function loadInstagramFeed() {
  // This would integrate with Instagram Basic Display API
  console.log("Loading Instagram feed...");
}

function loadTikTokFeed() {
  // This would integrate with TikTok API
  console.log("Loading TikTok feed...");
}

function loadFacebookFeed() {
  // This would integrate with Facebook Graph API
  console.log("Loading Facebook feed...");
}

// YouTube API integration (placeholder)
function loadYouTubeVideos() {
  // This would integrate with YouTube Data API v3
  console.log("Loading YouTube videos...");
}

// Utility functions
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

// Performance optimization
function lazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
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

// Initialize lazy loading
lazyLoadImages();

// Error handling for missing images
document.addEventListener(
  "error",
  function (e) {
    if (e.target.tagName === "IMG") {
      e.target.src = "assets/images/placeholder.jpg";
      e.target.alt = "Image not available";
    }
  },
  true
);

// Console welcome message
console.log(`
🌟 Welcome to Explore With Sowrav!
🎬 Follow the journey: youtube.com/@sowrav.explore
📸 Daily adventures: instagram.com/sowrav.explore
🚀 Website built with modern web technologies
`);

// Export functions for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initNavigation,
    initGallery,
    initNewsletterForm,
    showNotification,
    openLightbox,
  };
}
