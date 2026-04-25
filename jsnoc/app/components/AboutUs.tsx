"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/LanguageContext";

export default function AboutUs() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasGlitched, setHasGlitched] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasGlitched) {
            setHasGlitched(true);
            section.classList.add("glitch-active");

            setTimeout(() => {
              section.classList.remove("glitch-active");
            }, 200);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasGlitched]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-20 bg-gradient-to-br from-[#05080F] via-[#0A0F1C] to-[#05080F] font-jost overflow-hidden"
    >
      {/* Top gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />
      
      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6F0FF] mb-4 glitch-text">
          {t('about.title')}
        </h2>

        {/* Original short paragraph - always visible */}
        <p className="max-w-3xl mx-auto text-[#E6F0FF]/70 text-base leading-relaxed mb-6 glitch-text">
          {t('about.short')}
        </p>

        {/* Collapsible Content - Three detailed sections with icons */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[800px] opacity-100 mb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-3xl mx-auto space-y-4">
            {/* Professional & Clean */}
            <div className="bg-[#1E90FF]/5 rounded-lg p-4 border border-[#1E90FF]/10 text-left">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#1E90FF]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#1E90FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 9H9L8 4z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 20h14" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#1E90FF] font-semibold mb-1 text-lg">{t('about.professional.title')}</h3>
                  <p className="text-[#E6F0FF]/70 text-sm leading-relaxed">
                    {t('about.professional.desc')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Straightforward & Practical */}
            <div className="bg-[#1E90FF]/5 rounded-lg p-4 border border-[#1E90FF]/10 text-left">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#1E90FF]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#1E90FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#1E90FF] font-semibold mb-1 text-lg">{t('about.practical.title')}</h3>
                  <p className="text-[#E6F0FF]/70 text-sm leading-relaxed">
                    {t('about.practical.desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Modern & Tech-Focused */}
            <div className="bg-[#1E90FF]/5 rounded-lg p-4 border border-[#1E90FF]/10 text-left">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-[#1E90FF]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#1E90FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 14h14v-6H5v6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#1E90FF] font-semibold mb-1 text-lg">{t('about.modern.title')}</h3>
                  <p className="text-[#E6F0FF]/70 text-sm leading-relaxed">
                    {t('about.modern.desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-[#1E90FF]/5 rounded-lg p-4 border border-[#1E90FF]/10 text-center">
              <p className="text-[#E6F0FF]/80 text-sm mb-2">
                {t('about.contact.prefers')}
              </p>
              <p className="text-[#1E90FF] text-xl font-semibold">
                +8210-6399-2185
              </p>
              <p className="text-[#E6F0FF]/50 text-xs mt-1">
                {t('about.contact.message')}
              </p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-[#1E90FF] hover:bg-[#1E90FF]/80 text-white px-7 py-2.5 rounded-lg font-medium transition-all hover:scale-105 cursor-pointer text-sm inline-flex items-center gap-2"
        >
          {isExpanded ? t('about.button.less') : t('about.button.more')}
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .glitch-active .glitch-text {
          animation: fragmentGlitch 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes fragmentGlitch {
          0% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
          8% {
            clip-path: inset(10% 0 70% 0);
            transform: translate(-3px, 0);
          }
          16% {
            clip-path: inset(30% 0 40% 0);
            transform: translate(3px, 0);
          }
          25% {
            clip-path: inset(60% 0 20% 0);
            transform: translate(-2px, 0);
          }
          33% {
            clip-path: inset(15% 0 75% 0);
            transform: translate(2px, 0);
          }
          41% {
            clip-path: inset(80% 0 5% 0);
            transform: translate(-1px, 0);
          }
          50% {
            clip-path: inset(45% 0 45% 0);
            transform: translate(1px, 0);
          }
          58% {
            clip-path: inset(5% 0 85% 0);
            transform: translate(-2px, 0);
          }
          66% {
            clip-path: inset(50% 0 30% 0);
            transform: translate(2px, 0);
          }
          75% {
            clip-path: inset(25% 0 65% 0);
            transform: translate(-1px, 0);
          }
          83% {
            clip-path: inset(70% 0 10% 0);
            transform: translate(1px, 0);
          }
          91% {
            clip-path: inset(35% 0 55% 0);
            transform: translate(-1px, 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
        }
      `}</style>
    </section>
  );
}