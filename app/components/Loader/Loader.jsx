'use client';

import { useState, useEffect } from 'react';
import './Loader.css';

/**
 * Loader Component
 * A Next.js 16+ compatible loading screen featuring 
 * a progress bar, SVG circular animation, and smooth exit scaling.
 */
const Loader = ({
  duration = 3000,
  titleMain = 'Osaka',
  titleAccent = 'Masjid',
  subtitle = 'YOUR SPIRITUAL HOME IN THE CITY',
  onLoaded
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isScaling, setIsScaling] = useState(false);

  useEffect(() => {
    // 1. Start SVG circular animation almost immediately
    const circleTimer = setTimeout(() => {
      setIsComplete(true);
    }, 100);

    // 2. Start Linear Progress Bar
    const progressTimer = setTimeout(() => {
      setProgressWidth(100);
    }, 200);

    // 3. Trigger Exit Animation and Callback
    const totalTimer = setTimeout(() => {
      setIsScaling(true);
      setIsVisible(false);

      // Allow time for fade-out/scale transition before notifying parent
      const callbackTimer = setTimeout(() => {
        if (onLoaded) onLoaded();
      }, 1000);

      return () => clearTimeout(callbackTimer);
    }, duration);

    return () => {
      clearTimeout(circleTimer);
      clearTimeout(progressTimer);
      clearTimeout(totalTimer);
    };
  }, [duration, onLoaded]);

  if (!isVisible && !isScaling) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-100 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out loader-container-bg ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } ${isScaling ? 'scale-110' : 'scale-100'}`}
      >
        {/* Logo/Icon Container */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          {/* Animated Circle Border */}
          <svg
            className={`circular-loader absolute w-full h-full text-amber-400 ${isComplete ? 'loading-complete' : ''}`}
            viewBox="0 0 100 100"
            style={{ '--loader-duration': `${duration}ms` }}
          >
            <circle cx="50" cy="50" r="45" stroke="currentColor"></circle>
          </svg>

          {/* Central Icon */}
          <div className="z-10 text-white text-5xl pulse-effect">
            <i className="fas fa-book-quran"></i>
          </div>

          {/* Background Glow */}
          <div className="absolute inset-0 bg-emerald-600 rounded-full blur-xl opacity-20"></div>
        </div>

        {/* Text Container */}
        <div className="text-center space-y-3 z-10 px-4">
          <h1 className="text-3xl md:text-4xl text-white font-serif-display tracking-widest uppercase">
            {titleMain} <span className="text-amber-400">{titleAccent}</span>
          </h1>
          <p className="text-emerald-200 text-xs md:text-sm tracking-widest font-light">
            {subtitle}
          </p>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-64 h-1 bg-emerald-950 rounded-full mt-8 overflow-hidden relative border border-emerald-900/30">
          <div
            className="h-full bg-amber-400 rounded-full transition-all ease-in-out"
            style={{
              width: `${progressWidth}%`,
              transitionDuration: `${duration}ms`
            }}
          ></div>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-10 text-emerald-300/40 text-[10px] tracking-[0.2em] uppercase font-light text-center px-4">
          A place where faith, knowledge, and unity flourish together.
        </div>
      </div>
    </>
  );
};

export default Loader;