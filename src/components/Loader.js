// src/components/Loader.js

import React, { useEffect, useState } from 'react';
import '../styles/Loader.css';
import logo from '/logo.png'; // Put your logo in src/assets/logo.png

function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // 25ms × 100 = 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-screen">
      <img src={logo} alt="Company Logo" className="loader-logo-image" />

      <div className="loader-progress-container">
        <div
          className="loader-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="loader-percentage">{progress}%</div>

      <p className="loader-text">TCU ungalai Anbudan varavaikirathu</p>
    </div>
  );
}

export default Loader;