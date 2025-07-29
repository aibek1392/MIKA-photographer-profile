import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@mikaphotography.com',
      link: 'mailto:hello@mikaphotography.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '480-784-7840',
      link: 'tel:+14807847840',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'New York, NY',
      link: '#',
    },
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
    <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Get In Touch
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Ready to capture your special moments? I'd love to hear from you! 
              Whether you're planning a wedding, need professional portraits, or 
              want to document an event, let's discuss how I can help bring your 
              vision to life.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{info.title}</h3>
                  <a
                    href={info.link}
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {info.value}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Social Media Icons */}
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-6">Follow Me</h3>
              <div className="flex justify-center space-x-6">
                <motion.a
                  href="https://www.instagram.com/mikavisionnyc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-8 h-8 text-white" />
                </motion.a>
                
                <motion.a
                  href="https://wa.me/14807847840?text=Hi%20Mika!%20I'm%20interested%20in%20your%20photography%20services.%20Could%20you%20tell%20me%20more%20about%20your%20packages?"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              variants={itemVariants}
              className="mt-12 p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg max-w-md mx-auto"
            >
              <h3 className="font-semibold text-lg mb-6 text-gray-900 dark:text-white text-center">Business Hours</h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>By Appointment</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 