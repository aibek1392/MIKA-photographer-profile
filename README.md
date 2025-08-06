# Seraieledit - Professional Photography Portfolio Website

A modern, responsive photography portfolio website built with React, TypeScript, and Tailwind CSS. Features stunning galleries, parallax effects, and interactive elements to showcase photography work.

## 🌟 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Galleries**: Multiple gallery formats including 3D carousel, flip-reveal, and WebGL circular gallery
- **Parallax Effects**: Beautiful parallax scrolling on the hero section
- **Contact Integration**: Direct links to email, phone, WhatsApp, and Google Maps
- **Social Media**: Instagram integration and social sharing
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Performance Optimized**: Fast loading times and smooth animations

## 🚀 Live Demo

Visit the live website: [https://seraieledit-lwsjdww1o-ozhorov-8940s-projects.vercel.app](https://seraieledit-lwsjdww1o-ozhorov-8940s-projects.vercel.app)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **WebGL**: OGL library (for circular gallery)
- **Deployment**: Vercel
- **Version Control**: Git

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)

### Check your installations:

```bash
node --version
npm --version
git --version
```

If any of these commands fail, please install the missing software:

- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **Git**: Download from [git-scm.com](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/seraieledit-photography.git
cd seraieledit-photography
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Start Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
seraieledit-photography/
├── public/                 # Static assets
│   ├── index.html         # Main HTML file
│   └── images/            # Image assets
├── src/
│   ├── components/        # React components
│   │   ├── Hero.tsx      # Hero section with parallax
│   │   ├── About.tsx     # About section
│   │   ├── Portfolio.tsx # Portfolio gallery
│   │   ├── Contact.tsx   # Contact information
│   │   ├── Footer.tsx    # Footer component
│   │   └── ...           # Other components
│   ├── App.tsx           # Main app component
│   ├── index.tsx         # App entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## 🎨 Customization

### Updating Content

1. **Contact Information**: Edit `src/components/Contact.tsx`
   - Update email, phone, address
   - Modify WhatsApp message
   - Change business hours

2. **Social Media Links**: 
   - Instagram: Update in `Contact.tsx` and `Footer.tsx`
   - Other social platforms: Add to `Footer.tsx`

3. **Images**: 
   - Replace images in `public/` folder
   - Update image paths in components

4. **Text Content**: 
   - Hero text: Edit `src/components/Hero.tsx`
   - About section: Edit `src/components/About.tsx`
   - Portfolio descriptions: Edit `src/components/Portfolio.tsx`

### Styling

- **Colors**: Modify `tailwind.config.js` for theme colors
- **Fonts**: Update font imports in `src/index.css`
- **Animations**: Adjust Framer Motion settings in components

## 📱 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

3. **Follow the prompts** to connect your GitHub repository

### Deploy to Other Platforms

- **Netlify**: Connect your GitHub repo and set build command to `npm run build`
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload the `build` folder to an S3 bucket

## 🔧 Troubleshooting

### Common Issues

1. **Port 3000 already in use**:
   ```bash
   # Kill the process using port 3000
   lsof -ti:3000 | xargs kill -9
   # Or use a different port
   PORT=3001 npm start
   ```

2. **Node modules issues**:
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**:
   ```bash
   # Check for TypeScript errors
   npx tsc --noEmit
   # Check for linting errors
   npm run lint
   ```

### Performance Issues

- Ensure images are optimized (use WebP format when possible)
- Check bundle size with `npm run build`
- Consider lazy loading for large galleries

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the console for error messages
3. Ensure all dependencies are properly installed
4. Verify Node.js version compatibility

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- WebGL gallery using [OGL](https://github.com/oframe/ogl)

---

**Happy coding! 🎉**

If you find this project helpful, please consider giving it a ⭐️ on GitHub!
