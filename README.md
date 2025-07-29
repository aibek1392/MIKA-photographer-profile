# Mika Photography Portfolio Website

A modern, mobile-first, responsive photographer portfolio website built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- **One-page smooth-scroll layout** with sections for Home, About, Portfolio, and Contact
- **Full-screen hero section** with animated background and typewriter effect
- **Responsive photo gallery** with lightbox functionality and category filtering
- **Sticky navigation** with smooth scrolling to sections
- **Dark/light mode toggle** with persistent theme preference
- **Mobile-friendly design** with hamburger menu for smaller screens
- **Contact form** with validation and success feedback
- **Social media integration** in footer
- **Smooth animations** using Framer Motion
- **SEO optimized** with proper meta tags and semantic HTML
- **Performance optimized** with lazy loading images

## 🚀 Technologies Used

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Intersection Observer** for scroll animations
- **React Simple Typewriter** for typewriter effects
- **Lucide React** for icons

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   └── Portfolio.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Design Features

### Hero Section
- Full-screen background image with overlay
- Animated text with typewriter effect
- Call-to-action buttons
- Smooth scroll indicator

### About Section
- Personal introduction with animated stats
- Fun facts about the photographer
- Responsive grid layout

### Portfolio Section
- Filterable gallery by category (All, Weddings, Portraits, Events)
- Lightbox functionality with navigation
- Hover effects and smooth transitions
- Lazy loading for performance

### Contact Section
- Contact form with validation
- Business hours and contact information
- Success feedback on form submission

### Navigation & Footer
- Sticky navigation with scroll effects
- Mobile hamburger menu
- Social media links
- Back to top button

## 🎯 Key Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized for all device sizes

### Dark Mode
- Toggle between light and dark themes
- Persistent theme preference using localStorage
- Smooth transitions between themes

### Animations
- Scroll-triggered animations using Intersection Observer
- Smooth page transitions
- Hover effects and micro-interactions
- Staggered animations for lists and grids

### Performance
- Lazy loading images
- Optimized bundle size
- Preconnect to external domains
- Semantic HTML for better SEO

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Mobile Features

- Touch-friendly navigation
- Swipe gestures for lightbox
- Optimized touch targets
- Responsive typography
- Mobile-optimized forms

## 🎨 Customization

### Colors & Themes
The website uses Tailwind CSS with a custom color palette. You can modify colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### Content
- Update personal information in component files
- Replace placeholder images with actual photography work
- Modify contact information and social media links
- Customize business hours and services

### Styling
- Modify component styles in individual `.tsx` files
- Update global styles in `src/index.css`
- Customize animations in `tailwind.config.js`

## 📸 Image Placeholders

The website currently uses Unsplash images as placeholders. Replace these with actual photography work:

1. **Hero Background**: Update the background image URL in `Hero.tsx`
2. **Portfolio Images**: Replace image URLs in the `images` array in `Portfolio.tsx`
3. **About Section**: Add personal photos as needed

## 🔧 Configuration

### Tailwind CSS
The project is configured with Tailwind CSS v4. Custom animations and utilities are defined in `tailwind.config.js`.

### Framer Motion
Animation variants and transitions are defined in each component for optimal performance.

### SEO
Meta tags and Open Graph data are configured in `public/index.html` for better social media sharing.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please contact:
- Email: hello@mikaphotography.com
- Phone: +1 (555) 123-4567

---

**Note**: This is a template website. Replace all placeholder content, images, and contact information with actual photographer details before deployment.
