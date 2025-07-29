# 📸 Mika Photography Website

A modern, responsive photographer portfolio website built with React, TypeScript, and Tailwind CSS. Features a stunning 3D photo carousel, smooth animations, and professional design.

## ✨ Features

### 🎨 Design & UI
- **Modern One-Page Layout**: Smooth scrolling sections (Home, About, Portfolio, Contact)
- **Dark/Light Mode Toggle**: Persistent theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional Typography**: Custom fonts (Prata, Inter) and gradient text effects
- **Sticky Navigation**: Glassy navbar with smooth animations

### 📸 Photography Showcase
- **3D Photo Carousel**: Instagram feed with 3D perspective transforms
- **Lightbox Gallery**: Click to zoom with keyboard navigation
- **Portfolio Grid**: Animated flip reveal gallery with category filtering
- **Image Auto Slider**: Smooth carousel with auto-play and controls

### 🚀 Technical Features
- **React 19** with TypeScript for type safety
- **Framer Motion** for smooth animations and transitions
- **Tailwind CSS** for utility-first styling
- **React Intersection Observer** for scroll-triggered animations
- **React Simple Typewriter** for hero text effects
- **Lucide React** for consistent iconography

### 📱 Interactive Elements
- **Smooth Scrolling**: Navigation with scroll-to-section functionality
- **Auto-play Controls**: Pause/play functionality with hover detection
- **Touch Support**: Mobile-friendly interactions and gestures
- **Keyboard Navigation**: Full accessibility support
- **Social Media Integration**: Instagram and WhatsApp links

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v3.4.0
- **Animations**: Framer Motion
- **Build Tool**: Create React App
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Prata, Inter, Playfair Display)

## 📁 Project Structure

```
MIKA_PHOTOGRAPHER_WEBSITE/
├── frontend/
│   ├── public/
│   │   ├── photo_*.jpeg           # Photography portfolio images
│   │   ├── favicon.svg            # Custom favicon
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.tsx           # Hero section with typewriter effect
│   │   │   ├── About.tsx          # About section
│   │   │   ├── Portfolio.tsx      # Portfolio with flip reveal
│   │   │   ├── ThreeDPhotoCarousel.tsx # 3D Instagram carousel
│   │   │   ├── ThreeDCarousel.tsx # Reusable 3D carousel component
│   │   │   ├── InstagramFeed.tsx  # Instagram integration
│   │   │   ├── Contact.tsx        # Contact section
│   │   │   ├── Footer.tsx         # Footer with social links
│   │   │   ├── Navigation.tsx     # Responsive navigation
│   │   │   ├── FlipReveal.tsx     # Gallery animation component
│   │   │   └── ToggleGroup.tsx    # UI component for filtering
│   │   ├── App.tsx                # Main application
│   │   ├── index.tsx              # React entry point
│   │   └── index.css              # Global styles and Tailwind
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aibek1392/MIKA-photographer-profile.git
   cd MIKA-photographer-profile
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🎯 Key Components

### ThreeDCarousel
Reusable 3D carousel component matching 21st.dev design:

```tsx
import { ThreeDCarousel, CarouselItem } from './ThreeDCarousel';

const items: CarouselItem[] = [
  {
    id: 1,
    imageUrl: '/path/to/image.jpg',
    alt: 'Description',
    title: 'Optional title',
    description: 'Optional description'
  }
];

<ThreeDCarousel
  items={items}
  autoPlay={true}
  showNavigation={true}
  onItemClick={(item, index) => console.log('Clicked:', item)}
/>
```

### Portfolio Gallery
Animated flip reveal with category filtering:

```tsx
<FlipReveal 
  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" 
  keys={[selectedCategory]}
>
  {images.map((image) => (
    <FlipRevealItem key={image.id} flipKey={image.category}>
      {/* Image content */}
    </FlipRevealItem>
  ))}
</FlipReveal>
```

## 🎨 Customization

### Colors & Themes
Modify `tailwind.config.js` to customize the color palette:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Fonts
Update `src/index.css` to change fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
```

### Images
Replace images in `public/` folder with your own photography:
- Recommended size: 1200x800px or larger
- Format: JPEG for photos, PNG for graphics
- Optimize for web to ensure fast loading

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Performance Optimizations

- **Lazy Loading**: Images load only when needed
- **Optimized Animations**: 60fps smooth animations
- **Code Splitting**: Components loaded on demand
- **Image Optimization**: Compressed photos for fast loading
- **Efficient Re-renders**: Optimized React hooks and memoization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Mika Photography**
- Instagram: [@mikavisionnyc](https://instagram.com/mikavisionnyc)
- WhatsApp: [Send Message](https://wa.me/1234567890)

## 🙏 Acknowledgments

- [21st.dev](https://21st.dev) for design inspiration
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Unsplash](https://unsplash.com/) for placeholder images

---

Built with ❤️ by Mika Photography
