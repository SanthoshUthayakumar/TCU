import React, { useEffect, useRef, useState } from 'react';
import '../styles/Loader.css';
import vid8 from '../assets/videos/intro.webm';

function Loader({ onFinish }) {
  const videoRef = useRef(null);

  const [progress, setProgress] = useState(1);
  const [videoEnded, setVideoEnded] = useState(false);
  const [muted, setMuted] = useState(true);

  // 15 second loading progress
  useEffect(() => {
    const duration = 17000; // 15 seconds
    const intervalTime = 170; // update every 150ms

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 1;
      });
    }, duration / 99);

    return () => clearInterval(interval);
  }, []);

  // Check whether both video and loading are finished
  useEffect(() => {
    if (progress >= 100 && videoEnded) {
      onFinish();
    }
  }, [progress, videoEnded, onFinish]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="loader-screen">

      {/* Background Video */}
      <video
        ref={videoRef}
        className="loader-video"
        src={vid8}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* Dark overlay */}
      <div className="loader-overlay"></div>

      {/* Loading Content */}
      <div className="loader-content">

        <div className="loader-percentage">
          {progress}%
        </div>

        <div className="loader-progress-container">
          <div
            className="loader-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="loader-text">
          Loading...
        </p>

      </div>

      {/* Sound Button */}
      <button
        className="sound-button"
        onClick={toggleSound}
      >
        {muted ? 'SOUND ON' : 'SOUND OFF'}
      </button>

    </div>
  );
}

export default Loader;