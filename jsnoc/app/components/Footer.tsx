"use client";

import Link from "next/link";
import { useLanguage } from "@/app/LanguageContext";

export default function Footer() {
  const { t, language, setLanguage } = useLanguage();

  const changeLanguage = (lang: "EN" | "KR") => {
    setLanguage(lang);
  };

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative w-full bg-gradient-to-br from-[#05080F] via-[#0A0F1C] to-[#05080F] font-jost border-t border-[#1E90FF]/10">
      {/* Top gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Contact Section */}
          <div>
            <h3 className="text-[#1E90FF] text-lg font-semibold mb-4 tracking-wide">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 text-[#E6F0FF]/70 text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-[#1E90FF]/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>강남구 역삼동 서울특별시</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#1E90FF]/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(+82) 10-6399-2185</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#1E90FF]/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:inquiry@jsnoc.com" className="hover:text-[#1E90FF] transition-colors">
                  inquiry@jsnoc.com
                </a>
              </li>
            </ul>
          </div>

          {/* Site Navigation Section */}
          <div>
            <h3 className="text-[#1E90FF] text-lg font-semibold mb-4 tracking-wide">
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleScrollLink(e, 'home')}
                  className="text-[#E6F0FF]/70 hover:text-[#1E90FF] transition-colors cursor-pointer"
                >
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => handleScrollLink(e, 'about')}
                  className="text-[#E6F0FF]/70 hover:text-[#1E90FF] transition-colors cursor-pointer"
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => handleScrollLink(e, 'services')}
                  className="text-[#E6F0FF]/70 hover:text-[#1E90FF] transition-colors cursor-pointer"
                >
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleScrollLink(e, 'contact')}
                  className="text-[#E6F0FF]/70 hover:text-[#1E90FF] transition-colors cursor-pointer"
                >
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Others Section */}
          <div>
            <h3 className="text-[#1E90FF] text-lg font-semibold mb-4 tracking-wide">
              {t('footer.others')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal" className="text-[#E6F0FF]/70 hover:text-[#1E90FF] transition-colors">
                  {t('footer.legal')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#E6F0FF]/70 hover:text-[#1E90FF] transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Language Switcher & Brand Section */}
          <div>
            <h3 className="text-[#1E90FF] text-lg font-semibold mb-4 tracking-wide">
              {t('footer.language')}
            </h3>
            <div className="flex gap-3">
              <button 
                onClick={() => changeLanguage("KR")}
                className={`transition-colors text-sm font-medium ${
                  language === "KR" 
                    ? "text-[#1E90FF]" 
                    : "text-[#E6F0FF]/70 hover:text-[#1E90FF]"
                }`}
              >
                한국어
              </button>
              <span className="text-[#E6F0FF]/30">|</span>
              <button 
                onClick={() => changeLanguage("EN")}
                className={`transition-colors text-sm font-medium ${
                  language === "EN" 
                    ? "text-[#1E90FF]" 
                    : "text-[#E6F0FF]/70 hover:text-[#1E90FF]"
                }`}
              >
                English
              </button>
            </div>
            
            {/* Logo/Brand */}
            <div className="mt-6 pt-6 border-t border-[#1E90FF]/10">
              <p className="text-[#E6F0FF]/50 text-xs">
                © {new Date().getFullYear()} JSNOC
                <br />
                {t('footer.company')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#1E90FF]/10 text-center">
          <p className="text-[#E6F0FF]/40 text-xs">
            {t('footer.copyright')} {t('footer.bottom.text')}
          </p>
        </div>
      </div>
    </footer>
  );
}