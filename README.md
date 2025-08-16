# Explore With Sowrav - Personal Brand Website

A modern, responsive website for Sowrav Hasan's personal brand showcasing travel, food, photography, cinematography, moto adventures, and lifestyle content.

## 🌟 Features

### Homepage

- **Hero Section** with brand tagline and social media links
- **About Preview** introducing Sowrav's story
- **Featured Categories** showcasing different content types
- **YouTube Video Section** with embedded latest videos
- **Gallery Preview** with filterable photo grid
- **Social Media Integration** displaying latest posts
- **Newsletter Signup** for audience engagement

### About Page

- **Personal Story** and journey timeline
- **Skills & Expertise** showcase
- **Values & Mission** statement
- **Achievement Statistics** with animated counters
- **Personal Video** section

### Blog Page

- **Category-based Filtering** (Travel, Food, Photography, etc.)
- **Featured Posts** with rich preview cards
- **Sidebar** with recent posts, tags, and newsletter signup
- **Pagination** for easy navigation
- **Search Functionality** (ready to implement)

### Gallery Page

- **Filterable Photo Gallery** by categories
- **Lightbox View** with navigation
- **Multiple View Options** (Grid/Masonry)
- **Video Gallery** section
- **Statistics Counter** for achievements

### Videos Page

- **Featured Video** showcase
- **Categorized Playlists** (Travel Vlogs, Food Journey, etc.)
- **YouTube Integration** with embedded videos
- **Social Media Videos** (Instagram Reels, TikTok, etc.)
- **Video Production Services** showcase
- **Channel Statistics** with animated counters

### Contact Page

- **Professional Contact Form** with project type selection
- **Service Offerings** showcase
- **FAQ Section** with expandable answers
- **Social Media Links** and contact information
- **Response Time** and availability details

## 🎨 Design Features

### Brand Colors

- **Midnight Blue**: #0D1B2A
- **Sky Blue**: #1FA2FF
- **Sunset Orange**: #FF6B35
- **Emerald Green**: #2ECC71
- **White**: #FFFFFF
- **Light Gray**: #F5F5F5
- **Charcoal**: #222222

### Typography

- **Headings**: Poppins (Bold)
- **Body Text**: Roboto (Regular)
- **Quotes/Captions**: Playfair Display (Italic)

### Interactive Elements

- **Smooth Animations** and transitions
- **Hover Effects** on cards and buttons
- **Animated Counters** for statistics
- **Lightbox Gallery** with navigation
- **Mobile-Responsive** navigation
- **Loading States** for dynamic content

## 🛠️ Technical Implementation

### Frontend Technologies

- **HTML5** with semantic markup
- **CSS3** with custom properties and modern features
- **Vanilla JavaScript** for interactivity
- **Font Awesome** for icons
- **Google Fonts** for typography

### Key JavaScript Features

- **Dynamic Content Loading** for blog posts and gallery
- **Category Filtering** system
- **Newsletter Form** handling
- **Animated Statistics** counters
- **Lightbox Gallery** functionality
- **Mobile Navigation** toggle
- **Scroll Animations** and progress indicators

### CSS Features

- **CSS Grid** and **Flexbox** for layouts
- **Custom CSS Variables** for consistent theming
- **Responsive Design** with mobile-first approach
- **CSS Animations** and transitions
- **Modern CSS** features (backdrop-filter, etc.)

## 📁 File Structure

```
social website/
├── index.html              # Homepage
├── about.html              # About page
├── blog.html               # Blog page
├── gallery.html            # Gallery page
├── videos.html             # Videos page
├── contact.html            # Contact page
├── css/
│   ├── style.css           # Main stylesheet
│   ├── about.css           # About page styles
│   ├── blog.css            # Blog page styles
│   ├── gallery.css         # Gallery page styles (to be created)
│   ├── videos.css          # Videos page styles (to be created)
│   └── contact.css         # Contact page styles (to be created)
├── js/
│   ├── script.js           # Main JavaScript functionality
│   ├── about.js            # About page specific scripts
│   ├── blog.js             # Blog page functionality
│   ├── gallery.js          # Gallery functionality (to be created)
│   ├── videos.js           # Videos page scripts (to be created)
│   └── contact.js          # Contact form handling (to be created)
└── assets/
    ├── images/
    │   ├── gallery/        # Gallery images
    │   └── blog/           # Blog post images
    └── videos/             # Video files
```

## 🚀 Setup Instructions

### 1. Local Development

1. Clone or download the website files
2. Open `index.html` in a modern web browser
3. For local development, use a local server:

   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

### 2. Adding Content

#### Images

- Add your photos to `assets/images/`
- Update image paths in HTML files
- Optimize images for web (recommended: WebP format)

#### Videos

- Upload videos to YouTube/social media platforms
- Update video IDs in the HTML files
- Add local video files to `assets/videos/` for hero backgrounds

#### Blog Posts

- Add new blog posts to the `blogPosts` array in `js/blog.js`
- Include title, excerpt, category, image, date, and tags
- Images should be placed in `assets/images/blog/`

#### Gallery Photos

- Add photos to the gallery data in `js/gallery.js`
- Organize by categories (travel, food, photography, moto, lifestyle)
- Include captions and metadata

### 3. Customization

#### Branding

- Update brand colors in CSS custom properties
- Replace logo and brand name throughout the site
- Update social media links and contact information

#### Social Media Integration

- Update all social media URLs with your actual profiles
- Configure API integrations for live social feeds (optional)
- Update YouTube channel ID for video embeds

#### Contact Form

- Implement backend form handling (PHP, Node.js, or form service)
- Update email address and contact information
- Configure email notifications for new messages

## 📱 Social Media Links

All social media links are configured for Sowrav's profiles:

- **YouTube**: https://www.youtube.com/@sowrav.explore
- **Instagram**: https://www.instagram.com/sowrav.explore/
- **Facebook Page**: https://www.facebook.com/explore.sowrav/
- **Facebook Profile**: https://www.facebook.com/sowrav.explore/
- **TikTok**: https://www.tiktok.com/@sowrav.explore
- **Threads**: https://www.threads.com/@sowrav.explore
- **Email**: contact@explorewithsowrav.com

## 🎯 SEO & Performance

### SEO Features

- **Semantic HTML** structure
- **Meta tags** for each page
- **Open Graph** tags for social sharing
- **Structured data** ready for implementation
- **Fast loading** optimized assets

### Performance Optimizations

- **Lazy loading** for images and videos
- **Minified CSS and JS** (production ready)
- **Responsive images** with appropriate sizing
- **Efficient animations** using CSS transforms
- **Progressive enhancement** approach

## 🔧 Advanced Features to Implement

### Backend Integration

- **Contact Form** processing
- **Newsletter Subscription** via Mailchimp/ConvertKit
- **Blog CMS** integration
- **Social Media Feeds** API integration
- **Analytics** tracking (Google Analytics)

### Content Management

- **Admin Dashboard** for content updates
- **Image Upload** and management system
- **Blog Post** creation and editing
- **Gallery Management** with metadata
- **Video Playlist** management

### Interactive Features

- **Comment System** for blog posts
- **User Authentication** for exclusive content
- **Download Center** for travel guides
- **Booking System** for photography services
- **Live Chat** integration

## 📄 License

This website template is created specifically for Sowrav Hasan's personal brand. The design and content are customized for his travel, food, and photography content.

## 🤝 Support

For technical support or customization requests:

- **Email**: contact@explorewithsowrav.com
- **Website**: [Your website URL]

---

**Built with ❤️ for authentic storytelling and inspiring adventures**
