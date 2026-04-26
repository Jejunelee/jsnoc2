"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/app/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsVisible(true);

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Calculate responsive positions
  const getPosition = (percentage: number) => `${percentage}%`;
  
  // Define circuit paths relative to viewport
  const circuitPaths = {
    left: {
      short1: `M 0 ${dimensions.height * 0.15} L ${dimensions.width * 0.06} ${dimensions.height * 0.15} L ${dimensions.width * 0.08} ${dimensions.height * 0.12} L ${dimensions.width * 0.11} ${dimensions.height * 0.12}`,
      long1: `M 0 ${dimensions.height * 0.3} L ${dimensions.width * 0.09} ${dimensions.height * 0.3} L ${dimensions.width * 0.11} ${dimensions.height * 0.26} L ${dimensions.width * 0.18} ${dimensions.height * 0.26} L ${dimensions.width * 0.21} ${dimensions.height * 0.22} L ${dimensions.width * 0.27} ${dimensions.height * 0.22}`,
      medium1: `M 0 ${dimensions.height * 0.5} L ${dimensions.width * 0.1} ${dimensions.height * 0.5} L ${dimensions.width * 0.13} ${dimensions.height * 0.45} L ${dimensions.width * 0.2} ${dimensions.height * 0.45}`,
      branch1: `M ${dimensions.width * 0.13} ${dimensions.height * 0.45} L ${dimensions.width * 0.13} ${dimensions.height * 0.4} L ${dimensions.width * 0.17} ${dimensions.height * 0.4}`,
      xlong1: `M 0 ${dimensions.height * 0.7} L ${dimensions.width * 0.08} ${dimensions.height * 0.7} L ${dimensions.width * 0.1} ${dimensions.height * 0.65} L ${dimensions.width * 0.16} ${dimensions.height * 0.65} L ${dimensions.width * 0.18} ${dimensions.height * 0.6} L ${dimensions.width * 0.25} ${dimensions.height * 0.6} L ${dimensions.width * 0.28} ${dimensions.height * 0.55} L ${dimensions.width * 0.34} ${dimensions.height * 0.55}`,
      vertical1: `M ${dimensions.width * 0.03} ${dimensions.height * 0.85} L ${dimensions.width * 0.03} ${dimensions.height * 0.78} L ${dimensions.width * 0.05} ${dimensions.height * 0.73}`,
    },
    right: {
      short1: `M ${dimensions.width} ${dimensions.height * 0.18} L ${dimensions.width * 0.94} ${dimensions.height * 0.18} L ${dimensions.width * 0.92} ${dimensions.height * 0.14} L ${dimensions.width * 0.88} ${dimensions.height * 0.14}`,
      long1: `M ${dimensions.width} ${dimensions.height * 0.35} L ${dimensions.width * 0.91} ${dimensions.height * 0.35} L ${dimensions.width * 0.89} ${dimensions.height * 0.3} L ${dimensions.width * 0.82} ${dimensions.height * 0.3} L ${dimensions.width * 0.8} ${dimensions.height * 0.25} L ${dimensions.width * 0.73} ${dimensions.height * 0.25}`,
      medium1: `M ${dimensions.width} ${dimensions.height * 0.55} L ${dimensions.width * 0.91} ${dimensions.height * 0.55} L ${dimensions.width * 0.89} ${dimensions.height * 0.5} L ${dimensions.width * 0.82} ${dimensions.height * 0.5}`,
      xlong1: `M ${dimensions.width} ${dimensions.height * 0.75} L ${dimensions.width * 0.93} ${dimensions.height * 0.75} L ${dimensions.width * 0.9} ${dimensions.height * 0.7} L ${dimensions.width * 0.85} ${dimensions.height * 0.7} L ${dimensions.width * 0.82} ${dimensions.height * 0.65} L ${dimensions.width * 0.76} ${dimensions.height * 0.65}`,
      branch1: `M ${dimensions.width * 0.9} ${dimensions.height * 0.7} L ${dimensions.width * 0.9} ${dimensions.height * 0.65} L ${dimensions.width * 0.86} ${dimensions.height * 0.65}`,
      decorative1: `M ${dimensions.width} ${dimensions.height * 0.45} L ${dimensions.width * 0.96} ${dimensions.height * 0.45} L ${dimensions.width * 0.94} ${dimensions.height * 0.4} L ${dimensions.width * 0.88} ${dimensions.height * 0.4}`,
      vertical1: `M ${dimensions.width * 0.97} ${dimensions.height * 0.88} L ${dimensions.width * 0.97} ${dimensions.height * 0.8} L ${dimensions.width * 0.95} ${dimensions.height * 0.75} L ${dimensions.width * 0.95} ${dimensions.height * 0.68} L ${dimensions.width * 0.92} ${dimensions.height * 0.63}`,
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#05080F] via-[#0A0F1C] to-[#05080F] font-jost"
    >
      {/* Black Gradient from Bottom to Middle */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
      
      {/* Animated Circuit Lines - Responsive SVG */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-30" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox={`0 0 ${dimensions.width || 1920} ${dimensions.height || 1080}`}
      >
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E90FF" />
            <stop offset="50%" stopColor="#6EC1FF" />
            <stop offset="100%" stopColor="#1E90FF" />
          </linearGradient>
          <linearGradient id="circuitGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E90FF" />
            <stop offset="50%" stopColor="#6EC1FF" />
            <stop offset="100%" stopColor="#1E90FF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* LEFT SIDE CIRCUIT LINES */}
        {dimensions.width > 0 && (
          <>
            {/* Short line - Top left */}
            <path d={circuitPaths.left.short1} stroke="url(#circuitGradient)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-short" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
            <circle cx={dimensions.width * 0.11} cy={dimensions.height * 0.12} r="4" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow" style={{ opacity: 0 }} />
            
            {/* Long line - Upper middle left */}
            <path d={circuitPaths.left.long1} stroke="url(#circuitGradient)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-long animation-delay-800" style={{ strokeDashoffset: 1200, strokeDasharray: 1200 }} />
            <circle cx={dimensions.width * 0.27} cy={dimensions.height * 0.22} r="4" fill="#6EC1FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-300" style={{ opacity: 0 }} />
            
            {/* Medium line with branch - Middle left */}
            <path d={circuitPaths.left.medium1} stroke="url(#circuitGradient)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-medium animation-delay-1500" style={{ strokeDashoffset: 800, strokeDasharray: 800 }} />
            <path d={circuitPaths.left.branch1} stroke="url(#circuitGradient)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-short animation-delay-1700" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
            <circle cx={dimensions.width * 0.2} cy={dimensions.height * 0.45} r="4" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-700" style={{ opacity: 0 }} />
            <circle cx={dimensions.width * 0.17} cy={dimensions.height * 0.4} r="3" fill="#6EC1FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-900" style={{ opacity: 0 }} />
            
            {/* Extra long line - Bottom left */}
            <path d={circuitPaths.left.xlong1} stroke="url(#circuitGradient)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-xlong animation-delay-2200" style={{ strokeDashoffset: 1800, strokeDasharray: 1800 }} />
            <circle cx={dimensions.width * 0.34} cy={dimensions.height * 0.55} r="5" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-1100" style={{ opacity: 0 }} />
            
            {/* Short vertical line - Far left */}
            <path d={circuitPaths.left.vertical1} stroke="url(#circuitGradient)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-short animation-delay-2800" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
            <circle cx={dimensions.width * 0.05} cy={dimensions.height * 0.73} r="3" fill="#6EC1FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-1400" style={{ opacity: 0 }} />
          </>
        )}

        {/* RIGHT SIDE CIRCUIT LINES */}
        {dimensions.width > 0 && (
          <>
            {/* Short line - Top right */}
            <path d={circuitPaths.right.short1} stroke="url(#circuitGradientRight)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-short" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
            <circle cx={dimensions.width * 0.88} cy={dimensions.height * 0.14} r="4" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow" style={{ opacity: 0 }} />
            
            {/* Long line with curve - Upper middle right */}
            <path d={circuitPaths.right.long1} stroke="url(#circuitGradientRight)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-long animation-delay-1000" style={{ strokeDashoffset: 1200, strokeDasharray: 1200 }} />
            <circle cx={dimensions.width * 0.73} cy={dimensions.height * 0.25} r="4" fill="#6EC1FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-500" style={{ opacity: 0 }} />
            
            {/* Medium line - Middle right */}
            <path d={circuitPaths.right.medium1} stroke="url(#circuitGradientRight)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-medium animation-delay-1800" style={{ strokeDashoffset: 800, strokeDasharray: 800 }} />
            <circle cx={dimensions.width * 0.82} cy={dimensions.height * 0.5} r="4" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-900" style={{ opacity: 0 }} />
            
            {/* Extra long line with branch - Bottom right */}
            <path d={circuitPaths.right.xlong1} stroke="url(#circuitGradientRight)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-xlong animation-delay-2500" style={{ strokeDashoffset: 1800, strokeDasharray: 1800 }} />
            <path d={circuitPaths.right.branch1} stroke="url(#circuitGradientRight)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-short animation-delay-2700" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
            <circle cx={dimensions.width * 0.76} cy={dimensions.height * 0.65} r="5" fill="#6EC1FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-1200" style={{ opacity: 0 }} />
            <circle cx={dimensions.width * 0.86} cy={dimensions.height * 0.65} r="3" fill="#1E90FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-1400" style={{ opacity: 0 }} />
            
            {/* Additional decorative line - Right side */}
            <path d={circuitPaths.right.decorative1} stroke="url(#circuitGradientRight)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-short animation-delay-1200" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
            <circle cx={dimensions.width * 0.88} cy={dimensions.height * 0.4} r="3" fill="#1E90FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-600" style={{ opacity: 0 }} />
            
            {/* Vertical complex line - Far right */}
            <path d={circuitPaths.right.vertical1} stroke="url(#circuitGradientRight)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-medium animation-delay-3000" style={{ strokeDashoffset: 800, strokeDasharray: 800 }} />
            <circle cx={dimensions.width * 0.92} cy={dimensions.height * 0.63} r="3" fill="#6EC1FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-1500" style={{ opacity: 0 }} />
          </>
        )}
      </svg>

      {/* Mouse Following Glow - Neon Blue */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: `radial-gradient(circle at center, rgba(30,144,255,0.15) 0%, transparent 70%)`,
          transform: `translate(${mousePosition.x - 300}px, ${mousePosition.y - 300}px)`,
        }}
      />

      {/* Main Content - Centered */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto w-full pt-20 lg:pt-0 text-center">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-[1.2]">
              <span className="text-[#E6F0FF] animate-fadeInUp inline-block">
                {t('hero.title')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-[#6EC1FF] mb-6 font-light tracking-wide animate-fadeInUp animation-delay-400">
              {t('hero.subtitle')}
            </p>

            {/* Description */}
            <p className="text-[#E6F0FF]/70 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed animate-fadeInUp animation-delay-600">
              {t('hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-800">
              <Link
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('services');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1E90FF] backdrop-blur-sm border border-[#1E90FF]/40 text-[#E6F0FF] rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:border-[#1E90FF] hover:bg-[#1E90FF]/10"
              >
                {t('hero.button')}
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* Different draw line animations with varying lengths - plays once from hidden to visible */
        @keyframes drawLineShort {
          from {
            stroke-dashoffset: 500;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes drawLineMedium {
          from {
            stroke-dashoffset: 800;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes drawLineLong {
          from {
            stroke-dashoffset: 1200;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes drawLineXLong {
          from {
            stroke-dashoffset: 1800;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        /* Fade in circles after line completes */
        @keyframes fadeInCircle {
          0% {
            opacity: 0;
          }
          80% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        /* Continuous pulse glow after tracing */
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          50% {
            opacity: 0.6;
            filter: brightness(1.5);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-gradientShift {
          animation: gradientShift 3s ease-in-out infinite;
        }
        
        .animate-drawLine-short {
          animation: drawLineShort 5s ease-out forwards;
        }
        
        .animate-drawLine-medium {
          animation: drawLineMedium 7s ease-out forwards;
        }
        
        .animate-drawLine-long {
          animation: drawLineLong 9s ease-out forwards;
        }
        
        .animate-drawLine-xlong {
          animation: drawLineXLong 12s ease-out forwards;
        }
        
        .animate-pulse-glow {
          animation: fadeInCircle 5s ease-out forwards, pulseGlow 3s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1100 {
          animation-delay: 1.1s;
        }
        
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
        
        .animation-delay-1400 {
          animation-delay: 1.4s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        
        .animation-delay-1700 {
          animation-delay: 1.7s;
        }
        
        .animation-delay-1800 {
          animation-delay: 1.8s;
        }
        
        .animation-delay-2200 {
          animation-delay: 2.2s;
        }
        
        .animation-delay-2500 {
          animation-delay: 2.5s;
        }
        
        .animation-delay-2700 {
          animation-delay: 2.7s;
        }
        
        .animation-delay-2800 {
          animation-delay: 2.8s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </section>
  );
}