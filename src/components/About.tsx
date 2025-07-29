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
    <section id="about" className="section-padding bg-gray-50 dark:bg-gray-800">
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
            
            {/* Stats Cards Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-700 p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Happy Clients</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 lg:mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg card-hover"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center"
                >
                  <stat.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-3xl lg:text-4xl font-bold text-gradient mb-2"
                >
                  {stat.number}{stat.suffix}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                  className="text-sm text-gray-600 dark:text-gray-300 font-medium"
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 