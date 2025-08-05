import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Camera, Heart, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: Camera, number: 500, label: 'Weddings Shot', suffix: '+' },
    { icon: Heart, number: 1000, label: 'Happy Clients', suffix: '+' },
    { icon: Award, number: 8, label: 'Years Experience', suffix: '' },
    { icon: Users, number: 50, label: 'Events Covered', suffix: '+' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-800 min-h-screen">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* About Content */}
          <motion.div variants={itemVariants}>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gradient"
            >
              About Me
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
            >
              Hi, I'm Mika! I'm a passionate photographer with over 8 years of experience 
              capturing life's most precious moments. My journey began with a simple love 
              for storytelling through images, and it has evolved into a career dedicated 
              to creating timeless memories for couples, families, and individuals.
            </motion.p>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              I specialize in wedding photography, portrait sessions, and event coverage. 
              My approach combines artistic vision with technical expertise to deliver 
              images that not only look beautiful but also tell your unique story. 
              Every shoot is an opportunity to create something extraordinary.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                Wedding Photography
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                Portrait Sessions
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="w-2 h-2 bg-black dark:bg-white rounded-full"></div>
                Event Coverage
              </div>
            </motion.div>
          </motion.div>

          {/* Personal Photo */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/photo_2025-07-25 13.56.42.jpeg"
                alt="Mika - Professional Photographer"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="w-8 h-8 text-black dark:text-white" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-black dark:text-white mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About; 