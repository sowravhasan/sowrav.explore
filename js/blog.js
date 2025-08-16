// Blog page functionality

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "Cox's Bazar: The Ultimate Sunset Paradise",
    excerpt:
      "Discover the breathtaking beauty of Cox's Bazar, where endless beaches meet stunning sunsets. A complete guide to Bangladesh's most famous coastal destination.",
    content: "Full article content here...",
    category: "travel",
    image: "assets/images/blog/coxs-bazar.jpg",
    date: "2025-03-15",
    author: "Sowrav Hasan",
    featured: true,
    tags: ["Travel", "Bangladesh", "Beach", "Sunset", "Guide"],
  },
  {
    id: 2,
    title: "Street Food Adventures in Old Dhaka",
    excerpt:
      "Join me on a culinary journey through the historic streets of Old Dhaka, where every corner tells a story through its flavors.",
    content: "Full article content here...",
    category: "food",
    image: "assets/images/blog/old-dhaka-food.jpg",
    date: "2025-03-12",
    author: "Sowrav Hasan",
    featured: false,
    tags: ["Food", "Street Food", "Dhaka", "Culture", "Bangladesh"],
  },
  {
    id: 3,
    title: "Golden Hour Photography: Tips from the Field",
    excerpt:
      "Master the art of golden hour photography with these practical tips and techniques learned from years of chasing the perfect light.",
    content: "Full article content here...",
    category: "photography",
    image: "assets/images/blog/golden-hour.jpg",
    date: "2025-03-10",
    author: "Sowrav Hasan",
    featured: false,
    tags: ["Photography", "Tips", "Golden Hour", "Techniques"],
  },
  {
    id: 4,
    title: "Cinematic Travel Videos: My Production Process",
    excerpt:
      "Behind the scenes of creating cinematic travel content. From planning to post-production, here's how I bring stories to life.",
    content: "Full article content here...",
    category: "cinematography",
    image: "assets/images/blog/cinematography.jpg",
    date: "2025-03-08",
    author: "Sowrav Hasan",
    featured: false,
    tags: ["Cinematography", "Video", "Production", "Travel"],
  },
  {
    id: 5,
    title: "Highway Therapy: My First Solo Moto Journey",
    excerpt:
      "The freedom of the open road and the lessons learned during my first solo motorcycle journey across Bangladesh.",
    content: "Full article content here...",
    category: "moto",
    image: "assets/images/blog/moto-journey.jpg",
    date: "2025-03-05",
    author: "Sowrav Hasan",
    featured: false,
    tags: ["Motorcycle", "Solo Travel", "Adventure", "Journey"],
  },
  {
    id: 6,
    title: "Hidden Gems: Unexplored Places in Rangamati",
    excerpt:
      "Venture beyond the tourist trails and discover the untouched beauty of Rangamati's hidden landscapes and cultural treasures.",
    content: "Full article content here...",
    category: "travel",
    image: "assets/images/blog/rangamati.jpg",
    date: "2025-03-03",
    author: "Sowrav Hasan",
    featured: false,
    tags: ["Travel", "Hidden Gems", "Rangamati", "Nature", "Culture"],
  },
  {
    id: 7,
    title: "Traditional Bengali Sweets: A Sweet Journey",
    excerpt:
      "Explore the rich tradition of Bengali sweets, from classic rasgulla to modern interpretations of age-old recipes.",
    content: "Full article content here...",
    category: "food",
    image: "assets/images/blog/bengali-sweets.jpg",
    date: "2025-03-01",
    author: "Sowrav Hasan",
    featured: false,
    tags: ["Food", "Sweets", "Bengali", "Tradition", "Culture"],
  },
  {
    id: 8,
    title: "Capturing Motion: Action Photography Techniques",
    excerpt:
      "Learn how to freeze action and convey movement in your photographs with these essential action photography techniques.",
    content: "Full article content here...",
    category: "photography",
    image: "assets/images/blog/action-photography.jpg",
    date: "2025-02-28",
    author: "Sowrav Hasan",
    featured: false,
    tags: ["Photography", "Action", "Techniques", "Motion"],
  },
];

// DOM elements
let blogPostsContainer;
let categoryFilters;
let currentFilter = "all";
let currentPage = 1;
const postsPerPage = 6;

// Initialize blog functionality
document.addEventListener("DOMContentLoaded", function () {
  blogPostsContainer = document.getElementById("blog-posts");
  categoryFilters = document.querySelectorAll(".category-filter");

  initBlogFilters();
  initNewsletterForms();
  initPagination();
  loadBlogPosts();
});

// Initialize blog category filters
function initBlogFilters() {
  categoryFilters.forEach((filter) => {
    filter.addEventListener("click", function (e) {
      e.preventDefault();

      // Update active filter
      categoryFilters.forEach((f) => f.classList.remove("active"));
      this.classList.add("active");

      // Get filter category
      currentFilter = this.getAttribute("data-category");
      currentPage = 1;

      // Load filtered posts
      loadBlogPosts();
    });
  });
}

// Load and display blog posts
function loadBlogPosts() {
  if (!blogPostsContainer) return;

  // Show loading state
  blogPostsContainer.innerHTML =
    '<div class="loading-spinner"><div class="spinner"></div></div>';

  // Simulate API delay
  setTimeout(() => {
    let filteredPosts = blogPosts;

    // Filter posts by category
    if (currentFilter !== "all") {
      filteredPosts = blogPosts.filter(
        (post) => post.category === currentFilter
      );
    }

    // Paginate posts
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // Render posts
    renderBlogPosts(paginatedPosts);
    updatePagination(filteredPosts.length);
  }, 500);
}

// Render blog posts HTML
function renderBlogPosts(posts) {
  if (!blogPostsContainer) return;

  if (posts.length === 0) {
    blogPostsContainer.innerHTML = `
            <div class="no-posts">
                <h3>No posts found</h3>
                <p>No articles match your selected category. Try browsing all posts or select a different category.</p>
            </div>
        `;
    return;
  }

  let postsHTML = "";

  posts.forEach((post, index) => {
    const isFirstPost =
      index === 0 && currentPage === 1 && currentFilter === "all";
    const featuredClass = isFirstPost ? "featured" : "";

    postsHTML += `
            <article class="blog-post ${featuredClass}">
                <div class="blog-post-image">
                    <img src="${post.image}" alt="${post.title}">
                    <span class="post-category">${formatCategory(
                      post.category
                    )}</span>
                </div>
                <div class="blog-post-content">
                    <div class="post-meta">
                        <span><i class="fas fa-calendar"></i> ${formatDate(
                          post.date
                        )}</span>
                        <span><i class="fas fa-user"></i> ${post.author}</span>
                        <span><i class="fas fa-clock"></i> 5 min read</span>
                    </div>
                    <h3><a href="blog-post.html?id=${post.id}">${
      post.title
    }</a></h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <a href="blog-post.html?id=${post.id}" class="read-more">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `;
  });

  blogPostsContainer.innerHTML = postsHTML;

  // Add animation to posts
  const postElements = blogPostsContainer.querySelectorAll(".blog-post");
  postElements.forEach((post, index) => {
    post.style.opacity = "0";
    post.style.transform = "translateY(30px)";

    setTimeout(() => {
      post.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      post.style.opacity = "1";
      post.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Format category name
function formatCategory(category) {
  const categoryNames = {
    travel: "Travel",
    food: "Food",
    photography: "Photography",
    cinematography: "Cinematography",
    moto: "Moto Blog",
    lifestyle: "Lifestyle",
  };
  return categoryNames[category] || category;
}

// Format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

// Update pagination
function updatePagination(totalPosts) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pagination = document.querySelector(".pagination");

  if (!pagination) return;

  let paginationHTML = "";

  // Previous button
  const prevDisabled = currentPage === 1 ? "disabled" : "";
  paginationHTML += `<a href="#" class="page-link ${prevDisabled}" data-page="${
    currentPage - 1
  }">← Previous</a>`;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      const activeClass = i === currentPage ? "active" : "";
      paginationHTML += `<a href="#" class="page-link ${activeClass}" data-page="${i}">${i}</a>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationHTML += `<span class="page-ellipsis">...</span>`;
    }
  }

  // Next button
  const nextDisabled = currentPage === totalPages ? "disabled" : "";
  paginationHTML += `<a href="#" class="page-link ${nextDisabled}" data-page="${
    currentPage + 1
  }">Next →</a>`;

  pagination.innerHTML = paginationHTML;

  // Add pagination click handlers
  const pageLinks = pagination.querySelectorAll(".page-link:not(.disabled)");
  pageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const page = parseInt(this.getAttribute("data-page"));
      if (page && page !== currentPage) {
        currentPage = page;
        loadBlogPosts();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });
}

// Initialize pagination
function initPagination() {
  const pagination = document.querySelector(".pagination");
  if (pagination) {
    pagination.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }
}

// Newsletter form handlers
function initNewsletterForms() {
  const sidebarForm = document.querySelector(".sidebar-newsletter");
  const largeForm = document.getElementById("newsletter-form-large");

  if (sidebarForm) {
    sidebarForm.addEventListener("submit", handleNewsletterSubmit);
  }

  if (largeForm) {
    largeForm.addEventListener("submit", handleNewsletterSubmit);
  }
}

function handleNewsletterSubmit(e) {
  e.preventDefault();

  const email = e.target.querySelector('input[type="email"]').value;
  const submitBtn = e.target.querySelector("button");
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
    e.target.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Search functionality (if needed)
function initBlogSearch() {
  const searchInput = document.getElementById("blog-search");

  if (searchInput) {
    let searchTimeout;

    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const query = this.value.toLowerCase().trim();
        searchBlogPosts(query);
      }, 300);
    });
  }
}

function searchBlogPosts(query) {
  if (!query) {
    loadBlogPosts();
    return;
  }

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
  );

  currentPage = 1;
  renderBlogPosts(filteredPosts.slice(0, postsPerPage));
  updatePagination(filteredPosts.length);
}

// Add reading progress indicator
function initReadingProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "reading-progress";
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

// Initialize additional features
document.addEventListener("DOMContentLoaded", function () {
  initBlogSearch();
  initReadingProgress();

  // Update category counts
  updateCategoryCounts();
});

// Update category counts
function updateCategoryCounts() {
  const categoryCounts = {};

  // Count posts in each category
  blogPosts.forEach((post) => {
    categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
  });

  // Update UI
  categoryFilters.forEach((filter) => {
    const category = filter.getAttribute("data-category");
    const countSpan = filter.querySelector("span");

    if (countSpan) {
      if (category === "all") {
        countSpan.textContent = `(${blogPosts.length})`;
      } else {
        countSpan.textContent = `(${categoryCounts[category] || 0})`;
      }
    }
  });
}

// Add share functionality
function initSocialShare() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("share-btn")) {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      const platform = e.target.getAttribute("data-platform");

      let shareUrl = "";

      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank", "width=600,height=400");
      }
    }
  });
}

// Initialize social sharing
initSocialShare();

// Export for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    blogPosts,
    loadBlogPosts,
    formatDate,
    formatCategory,
  };
}
