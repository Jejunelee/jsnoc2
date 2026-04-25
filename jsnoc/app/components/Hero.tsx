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

  useEffect(() => {
    setIsVisible(true);

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
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#05080F] via-[#0A0F1C] to-[#05080F] font-jost"
    >
      {/* Black Gradient from Bottom to Middle */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
      
      {/* Animated Circuit Lines - Start invisible, trace in, stay glowing */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
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
        
        {/* LEFT SIDE CIRCUIT LINES - Different lengths */}
        {/* Short line - Top left */}
        <path d="M0 150 L120 150 L160 110 L220 110" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-short" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
        <circle cx="220" cy="110" r="4" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow" style={{ opacity: 0 }} />
        
        {/* Long line - Upper middle left */}
        <path d="M0 300 L180 300 L220 260 L350 260 L400 210 L520 210" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-long animation-delay-800" style={{ strokeDashoffset: 1200, strokeDasharray: 1200 }} />
        <circle cx="520" cy="210" r="4" fill="#6EC1FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-300" style={{ opacity: 0 }} />
        
        {/* Medium line with branch - Middle left */}
        <path d="M0 500 L200 500 L250 450 L380 450" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-medium animation-delay-1500" style={{ strokeDashoffset: 800, strokeDasharray: 800 }} />
        <path d="M250 450 L250 400 L320 400" stroke="url(#circuitGradient)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-short animation-delay-1700" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
        <circle cx="380" cy="450" r="4" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-700" style={{ opacity: 0 }} />
        <circle cx="320" cy="400" r="3" fill="#6EC1FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-900" style={{ opacity: 0 }} />
        
        {/* Extra long line - Bottom left */}
        <path d="M0 700 L150 700 L200 650 L300 650 L350 600 L480 600 L530 550 L650 550" stroke="url(#circuitGradient)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-xlong animation-delay-2200" style={{ strokeDashoffset: 1800, strokeDasharray: 1800 }} />
        <circle cx="650" cy="550" r="5" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-1100" style={{ opacity: 0 }} />
        
        {/* Short vertical line - Far left */}
        <path d="M50 850 L50 780 L100 730" stroke="url(#circuitGradient)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-short animation-delay-2800" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
        <circle cx="100" cy="730" r="3" fill="#6EC1FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-1400" style={{ opacity: 0 }} />

        {/* RIGHT SIDE CIRCUIT LINES - Different lengths, mirrored but varied */}
        {/* Short line - Top right */}
        <path d="M1920 180 L1800 180 L1760 140 L1700 140" stroke="url(#circuitGradientRight)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-short" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
        <circle cx="1700" cy="140" r="4" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow" style={{ opacity: 0 }} />
        
        {/* Long line with curve - Upper middle right */}
        <path d="M1920 350 L1750 350 L1700 300 L1580 300 L1530 250 L1400 250" stroke="url(#circuitGradientRight)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-long animation-delay-1000" style={{ strokeDashoffset: 1200, strokeDasharray: 1200 }} />
        <circle cx="1400" cy="250" r="4" fill="#6EC1FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-500" style={{ opacity: 0 }} />
        
        {/* Medium line - Middle right */}
        <path d="M1920 550 L1750 550 L1700 500 L1570 500" stroke="url(#circuitGradientRight)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-medium animation-delay-1800" style={{ strokeDashoffset: 800, strokeDasharray: 800 }} />
        <circle cx="1570" cy="500" r="4" fill="#1E90FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-900" style={{ opacity: 0 }} />
        
        {/* Extra long line with branch - Bottom right */}
        <path d="M1920 750 L1780 750 L1730 700 L1630 700 L1580 650 L1450 650" stroke="url(#circuitGradientRight)" strokeWidth="2" fill="none" filter="url(#strongGlow)" className="animate-drawLine-xlong animation-delay-2500" style={{ strokeDashoffset: 1800, strokeDasharray: 1800 }} />
        <path d="M1730 700 L1730 650 L1650 650" stroke="url(#circuitGradientRight)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-short animation-delay-2700" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
        <circle cx="1450" cy="650" r="5" fill="#6EC1FF" filter="url(#strongGlow)" className="animate-pulse-glow animation-delay-1200" style={{ opacity: 0 }} />
        <circle cx="1650" cy="650" r="3" fill="#1E90FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-1400" style={{ opacity: 0 }} />
        
        {/* Vertical complex line - Far right */}
        <path d="M1870 880 L1870 800 L1820 750 L1820 680 L1770 630" stroke="url(#circuitGradientRight)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-medium animation-delay-3000" style={{ strokeDashoffset: 800, strokeDasharray: 800 }} />
        <circle cx="1770" cy="630" r="3" fill="#6EC1FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-1500" style={{ opacity: 0 }} />
        
        {/* Additional decorative line - Right side */}
        <path d="M1920 450 L1850 450 L1800 400 L1680 400" stroke="url(#circuitGradientRight)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="animate-drawLine-short animation-delay-1200" style={{ strokeDashoffset: 500, strokeDasharray: 500 }} />
        <circle cx="1680" cy="400" r="3" fill="#1E90FF" filter="url(#glow)" className="animate-pulse-glow animation-delay-600" style={{ opacity: 0 }} />
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