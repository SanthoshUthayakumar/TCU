import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, A11y } from 'swiper/modules';
import { FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { packages, company } from '../data.js';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/Packages.css';

function PackageCard({ pkg }) {
  // Open WhatsApp with package-specific message
  const handleWhatsAppClick = () => {
    // Remove any non-digit characters from the number (+, spaces, dashes)
    const phone = String(company.whatsapp).replace(/\D/g, '');

    const message = `Hi, I am interested in your ${pkg.name} package. Please share more details.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pkg-card">
      <div className="pkg-card-glow" />

      <div className="pkg-icon-wrap">{pkg.icon}</div>

      <div className="pkg-name">{pkg.name.toUpperCase()}</div>

      <p className="pkg-description">{pkg.description}</p>

      <div className="pkg-price">
        <span className="pkg-price-label">Starting at</span>
        <span className="pkg-price-value">{pkg.price}</span>
        <span className="pkg-price-suffix"> / project</span>
      </div>

      <div className="pkg-divider" />

      <ul className="pkg-features">
        {pkg.features.map((feature, index) => (
          <li key={index} className="pkg-feature">
            <FiCheck className="pkg-check" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* WhatsApp Button */}
      <a
  className="pkg-btn"
  href={`https://api.whatsapp.com/send?phone=917305664736&text=${encodeURIComponent(
    `Hi, I am interested in your ${pkg.name} package. Please share more details.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => e.stopPropagation()}
>
  <FaWhatsapp />
  <span>Know More</span>
</a>
    </div>
  );
}

function Packages() {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="packages" id="packages" ref={ref}>
      <div className="packages-bg" />

      <div className="packages-inner">
        <div className="packages-header">
          <motion.div
            className="section-label"
            style={{ justifyContent: 'center' }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            What We Offer
          </motion.div>

          <motion.h2
            className="packages-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            OUR <span>PACKAGES</span>
          </motion.h2>

          <motion.p
            className="packages-subtitle"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tailored visual packages for every budget and creative vision.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Swiper
            modules={[Pagination, Navigation, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            className="packages-swiper"
            breakpoints={{
              600: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {packages.map((pkg) => (
              <SwiperSlide key={pkg.id}>
                <PackageCard pkg={pkg} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

export default Packages;