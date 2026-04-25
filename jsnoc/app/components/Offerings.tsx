"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/LanguageContext";

export default function Offerings() {
  const { t, tArray } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasGlitched, setHasGlitched] = useState(false);

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

  // Get translated arrays
  const handsOnItems = tArray('offerings.datacenter.hands.items');
  const processItems = tArray('offerings.datacenter.process.items');
  const endUserItems = tArray('offerings.enduser.items');

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-16 lg:py-20 bg-gradient-to-br from-[#05080F] via-[#0A0F1C] to-[#05080F] font-jost overflow-hidden"
    >
      {/* Black Gradient from Top to Middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none" />
      
      {/* Black Gradient from Bottom to Middle */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E6F0FF] mb-3 glitch-text">
            {t('offerings.title')}
          </h2>
          <div className="w-20 h-1 bg-[#1E90FF] mx-auto rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {/* Service 1 */}
          <div className="bg-[#0A0F1C]/50 backdrop-blur-sm border border-[#1E90FF]/10 rounded-xl p-5 hover:border-[#1E90FF]/30 transition-all hover:scale-[1.02]">
            <h3 className="text-lg font-bold text-[#1E90FF] mb-2 glitch-text">
              {t('offerings.service1.title')}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t('offerings.service1.desc')}
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-[#0A0F1C]/50 backdrop-blur-sm border border-[#1E90FF]/10 rounded-xl p-5 hover:border-[#1E90FF]/30 transition-all hover:scale-[1.02]">
            <h3 className="text-lg font-bold text-[#1E90FF] mb-2 glitch-text">
              {t('offerings.service2.title')}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t('offerings.service2.desc')}
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-[#0A0F1C]/50 backdrop-blur-sm border border-[#1E90FF]/10 rounded-xl p-5 hover:border-[#1E90FF]/30 transition-all hover:scale-[1.02]">
            <h3 className="text-lg font-bold text-[#1E90FF] mb-2 glitch-text">
              {t('offerings.service3.title')}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t('offerings.service3.desc')}
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-[#0A0F1C]/50 backdrop-blur-sm border border-[#1E90FF]/10 rounded-xl p-5 hover:border-[#1E90FF]/30 transition-all hover:scale-[1.02]">
            <h3 className="text-lg font-bold text-[#1E90FF] mb-2 glitch-text">
              {t('offerings.service4.title')}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t('offerings.service4.desc')}
            </p>
          </div>

          {/* Service 5 */}
          <div className="bg-[#0A0F1C]/50 backdrop-blur-sm border border-[#1E90FF]/10 rounded-xl p-5 hover:border-[#1E90FF]/30 transition-all hover:scale-[1.02]">
            <h3 className="text-lg font-bold text-[#1E90FF] mb-2 glitch-text">
              {t('offerings.service5.title')}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t('offerings.service5.desc')}
            </p>
          </div>

          {/* Service 6 */}
          <div className="bg-[#0A0F1C]/50 backdrop-blur-sm border border-[#1E90FF]/10 rounded-xl p-5 hover:border-[#1E90FF]/30 transition-all hover:scale-[1.02]">
            <h3 className="text-lg font-bold text-[#1E90FF] mb-2 glitch-text">
              {t('offerings.service6.title')}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {t('offerings.service6.desc')}
            </p>
          </div>
        </div>

        {/* Datacenter Section */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E6F0FF] mb-3 glitch-text">
              {t('offerings.datacenter.title')}
            </h2>
            <div className="w-20 h-1 bg-[#1E90FF] mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hands-On Experience */}
            <div className="bg-[#0A0F1C]/30 rounded-xl p-5 border border-[#1E90FF]/5">
              <h3 className="text-base font-semibold text-[#1E90FF] mb-3 glitch-text">
                {t('offerings.datacenter.hands.title')}
              </h3>
              <ul className="space-y-1.5">
                {handsOnItems.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-gray-300 flex items-start gap-2 text-sm">
                    <span className="text-[#1E90FF] mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process and Safety */}
            <div className="bg-[#0A0F1C]/30 rounded-xl p-5 border border-[#1E90FF]/5">
              <h3 className="text-base font-semibold text-[#1E90FF] mb-3 glitch-text">
                {t('offerings.datacenter.process.title')}
              </h3>
              <ul className="space-y-1.5">
                {processItems.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-gray-300 flex items-start gap-2 text-sm">
                    <span className="text-[#1E90FF] mt-0.5">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* End-User Support */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E6F0FF] mb-3 glitch-text">
              {t('offerings.enduser.title')}
            </h2>
            <div className="w-20 h-1 bg-[#1E90FF] mx-auto rounded-full" />
          </div>

          <div className="bg-[#0A0F1C]/30 rounded-xl p-6 border border-[#1E90FF]/5 max-w-3xl mx-auto">
            <p className="text-[#E6F0FF]/70 text-center mb-4 text-sm">
              {t('offerings.enduser.subtitle')}
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {endUserItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[#E6F0FF]/70 text-sm">
                  <span className="text-[#1E90FF]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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