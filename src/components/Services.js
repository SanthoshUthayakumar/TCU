import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiVideo, FiStar, FiTrendingUp, FiMic, FiUsers, FiCalendar, FiAward, FiCamera, FiHeart, FiRadio, FiScissors, FiTarget } from 'react-icons/fi';
import '../styles/Services.css'

const servicesData = [
  {
    id: 1,
    icon: <FiVideo className="service-icon" />,
    name: 'Mobile Videography',
    description: 'High-end vertical and horizontal content captured on the latest devices for immediate social impact.',
    size: 'wide'
  },
  {
    id: 2,
    icon: <FiStar className="service-icon" />,
    name: 'Celebrity Management',
    description: 'Comprehensive talent representation, brand collaborations, and exclusive career development.',
    size: 'tall'
  },
  {
    id: 3,
    icon: <FiTrendingUp className="service-icon" />,
    name: 'Social Media Management',
    description: 'Data-driven content strategies that foster engagement, build communities, and accelerate growth.',
    size: 'normal'
  },
  {
    id: 4,
    icon: <FiMic className="service-icon" />,
    name: 'PR Campaigns',
    description: 'Strategic media relations and narrative building that positions your brand at the forefront of the industry.',
    size: 'normal'
  },
  {
    id: 5,
    icon: <FiUsers className="service-icon" />,
    name: 'Influencer Marketing',
    description: 'Authentic creator partnerships that drive conversions and expand your reach across demographics.',
    size: 'normal'
  },
  {
    id: 6,
    icon: <FiCalendar className="service-icon" />,
    name: 'Corporate Events',
    description: 'Flawless execution of product launches, galas, and conferences with premium production value.',
    size: 'wide'
  },
  {
    id: 7,
    icon: <FiAward className="service-icon" />,
    name: 'Brand Promotions',
    description: 'Innovative activation campaigns tailored to elevate brand perception and consumer loyalty.',
    size: 'normal'
  },
  {
    id: 8,
    icon: <FiCamera className="service-icon" />,
    name: 'Photography',
    description: 'Bespoke editorial, commercial, and portrait photography that visually articulates your narrative.',
    size: 'normal'
  },
  {
    id: 9,
    icon: <FiHeart className="service-icon" />,
    name: 'Wedding Coverage',
    description: 'Cinematic storytelling and timeless captures of your most important celebrations.',
    size: 'normal'
  },
  {
    id: 11,
    icon: <FiScissors className="service-icon" />,
    name: 'Video Editing',
    description: 'Expert post-production, color grading, and motion graphics to transform raw footage into masterpieces.',
    size: 'wide'
  },
  {
    id: 12,
    icon: <FiTarget className="service-icon" />,
    name: 'Content Strategy',
    description: 'Actionable roadmaps for digital presence, optimizing formats, platforms, and publishing cadences.',
    size: 'normal'
  }
];

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services-container">
        <motion.div 
          className="services-header"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <span className="services-label">WHAT WE DO</span>
          <h2 className="services-title">Services Built for <span className="text-accent">Impact</span></h2>
          <p className="services-subtitle"></p>
        </motion.div>

        <motion.div 
          className="services-grid"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {servicesData.map((service) => (
            <motion.div 
              key={service.id}
              className={`service-card ${service.size !== 'normal' ? `service-card--${service.size}` : ''}`}
              variants={cardVariants}
            >
              <div className="service-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
