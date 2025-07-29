import React from 'react';
import { ThreeDCarousel, CarouselItem } from './ThreeDCarousel';

/**
 * Example usage of the ThreeDCarousel component
 * This demonstrates how to use the reusable 3D carousel with different configurations
 */
const ThreeDCarouselExample: React.FC = () => {
  // Sample data for the carousel
  const sampleImages: CarouselItem[] = [
    {
      id: 1,
      imageUrl: '/photo_2025-07-25 13.56.46.jpeg',
      alt: 'Elegant Wedding Moments',
      title: 'Elegant Wedding',
      description: 'Beautiful wedding photography'
    },
    {
      id: 2,
      imageUrl: '/photo_2025-07-25 13.56.42.jpeg',
      alt: 'Portrait Perfection',
      title: 'Portrait Session',
      description: 'Professional portrait photography'
    },
    {
      id: 3,
      imageUrl: '/photo_2025-07-25 13.56.39.jpeg',
      alt: 'Corporate Events',
      title: 'Corporate Event',
      description: 'Business event coverage'
    },
    {
      id: 4,
      imageUrl: '/photo_2025-07-25 13.56.36.jpeg',
      alt: 'Wedding Ceremony',
      title: 'Wedding Ceremony',
      description: 'Intimate ceremony moments'
    },
    {
      id: 5,
      imageUrl: '/photo_2025-07-25 13.56.32.jpeg',
      alt: 'Professional Headshots',
      title: 'Headshots',
      description: 'Professional business portraits'
    },
    {
      id: 6,
      imageUrl: '/photo_2025-07-25 13.56.25.jpeg',
      alt: 'Event Photography',
      title: 'Special Events',
      description: 'Memorable moments captured'
    },
    {
      id: 7,
      imageUrl: '/photo_2025-07-25 13.56.22.jpeg',
      alt: 'Reception Memories',
      title: 'Reception',
      description: 'Wedding reception highlights'
    },
    {
      id: 8,
      imageUrl: '/photo_2025-07-25 13.56.17.jpeg',
      alt: 'Family Portraits',
      title: 'Family Session',
      description: 'Beautiful family moments'
    }
  ];

  // Handle item click
  const handleItemClick = (item: CarouselItem, index: number) => {
    console.log('Clicked item:', item, 'at index:', index);
    // You can implement your own logic here, such as:
    // - Opening a lightbox
    // - Navigating to a detail page
    // - Showing a modal
  };

  // Handle index change
  const handleIndexChange = (index: number) => {
    console.log('Current index changed to:', index);
    // You can implement tracking or other logic here
  };

  return (
    <div className="w-full space-y-16 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">3D Carousel Examples</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Demonstrating different configurations of the reusable 3D carousel component
        </p>
      </div>

      {/* Full Featured Carousel */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Full Featured Carousel</h2>
        <ThreeDCarousel
          items={sampleImages}
          autoPlay={true}
          autoPlayInterval={3000}
          showNavigation={true}
          showDots={true}
          showProgressBar={true}
          height={450}
          width="max-w-7xl"
          onItemClick={handleItemClick}
          onIndexChange={handleIndexChange}
          className="mb-8"
        />
      </section>

      {/* Minimal Carousel */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Minimal Carousel</h2>
        <ThreeDCarousel
          items={sampleImages.slice(0, 5)} // Fewer items
          autoPlay={false}
          showNavigation={true}
          showDots={false}
          showProgressBar={false}
          height={350}
          width="max-w-5xl"
          className="mb-8"
        />
      </section>

      {/* Compact Carousel */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Compact Mobile-Friendly</h2>
        <ThreeDCarousel
          items={sampleImages.slice(0, 4)}
          autoPlay={true}
          autoPlayInterval={2000}
          showNavigation={true}
          showDots={true}
          showProgressBar={true}
          height={300}
          width="max-w-4xl"
          className="mb-8"
        />
      </section>

      {/* Usage Instructions */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Usage Instructions</h2>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">Basic Usage:</h3>
            <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded overflow-x-auto">
{`import { ThreeDCarousel, CarouselItem } from './ThreeDCarousel';

const items: CarouselItem[] = [
  {
    id: 1,
    imageUrl: '/path/to/image.jpg',
    alt: 'Image description',
    title: 'Optional title',
    description: 'Optional description'
  }
];

<ThreeDCarousel items={items} />`}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Props:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
              <li><code>items</code> - Array of carousel items (required)</li>
              <li><code>autoPlay</code> - Enable auto-play (default: true)</li>
              <li><code>autoPlayInterval</code> - Auto-play interval in ms (default: 3000)</li>
              <li><code>showNavigation</code> - Show arrow buttons (default: true)</li>
              <li><code>showDots</code> - Show dot indicators (default: true)</li>
              <li><code>showProgressBar</code> - Show progress bar (default: true)</li>
              <li><code>height</code> - Carousel height in pixels (default: 450)</li>
              <li><code>width</code> - Width classes (default: 'max-w-7xl')</li>
              <li><code>className</code> - Additional CSS classes</li>
              <li><code>onItemClick</code> - Callback when item is clicked</li>
              <li><code>onIndexChange</code> - Callback when index changes</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
              <li>3D perspective transforms matching 21st.dev design</li>
              <li>Responsive design for mobile and desktop</li>
              <li>Auto-play with pause on hover</li>
              <li>Smooth spring animations</li>
              <li>Keyboard and mouse navigation</li>
              <li>TypeScript support with full type safety</li>
              <li>Optimized image loading</li>
              <li>Accessibility features</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThreeDCarouselExample; 