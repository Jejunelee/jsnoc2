"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/app/LanguageContext";

// STEP 1: Define Types
// ====================
type NavigationLink = {
  href: string;
  labelKey: string;
  external?: boolean;
};

// STEP 2: Configure Navigation Data - Using section IDs
// =================================
const NAVIGATION_LINKS: NavigationLink[] = [
  { href: "#home", labelKey: "nav.home" },
  { href: "#about", labelKey: "nav.about" },
  { href: "#services", labelKey: "nav.services" },
  { href: "#contact", labelKey: "nav.contact" },
];

// STEP 3: Main Header Component
// ==============================
export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  
  // State Management
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleLanguageMenu = () => setIsLanguageMenuOpen(!isLanguageMenuOpen);
  
  const changeLanguage = (lang: "EN" | "KR") => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  // Utility Functions
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      
      // Update URL without scrolling
      history.pushState(null, "", `#${targetId}`);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = NAVIGATION_LINKS.map(link => link.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <header className="w-full flex justify-center fixed top-13 left-1/2 -translate-x-1/2 z-50 px-4 font-jost">
      <div className="w-[95%] sm:w-[92%] md:w-[90%] lg:w-[86.5%] max-w-8xl bg-[#0F2A44] rounded-sm px-4 sm:px-6 py-2 flex items-center justify-between shadow-lg border border-[#1E90FF]/20">
        
        {/* STEP 4: Logo Section */}
        <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#1E90FF] rounded-lg" aria-label="JSNOC">
          <div className="flex items-center gap-2">
            <Image 
              src="/JSNO.png" 
              alt="JSNO" 
              width={614} 
              height={361} 
              className="h-8 w-auto object-contain brightness-0 invert" 
              priority 
            />
          </div>
        </Link>

        {/* STEP 5: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4" aria-label="Main navigation">
          <ul className="flex items-center gap-1 lg:gap-2">
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleScroll(e, link.href.substring(1))}
                  className={`text-sm lg:text-base transition-colors duration-200 px-2 py-1 cursor-pointer font-jost ${
                    activeSection === link.href.substring(1)
                      ? "text-[#6EC1FF] font-semibold"
                      : "text-[#E6F0FF] hover:text-[#6EC1FF]"
                  }`}
                >
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Language Switcher - Desktop */}
          <div className="relative">
            <button
              onClick={toggleLanguageMenu}
              className="flex items-center gap-2 bg-[#0A0F1C] text-[#E6F0FF] px-4 py-2 rounded-xl text-sm lg:text-base font-medium hover:bg-[#1E90FF] hover:text-[#E6F0FF] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6EC1FF] focus:ring-offset-2 focus:ring-offset-[#0F2A44]"
              aria-label="Select language"
            >
              <Globe size={16} />
              <span>{language}</span>
            </button>
            
            {isLanguageMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#0F2A44] rounded-xl shadow-lg border border-[#1E90FF]/30 overflow-hidden min-w-[100px]">
                <button
                  onClick={() => changeLanguage("EN")}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                    language === "EN" 
                      ? "bg-[#1E90FF] text-[#E6F0FF]" 
                      : "text-[#E6F0FF] hover:bg-[#1E90FF] hover:text-[#E6F0FF]"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage("KR")}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                    language === "KR" 
                      ? "bg-[#1E90FF] text-[#E6F0FF]" 
                      : "text-[#E6F0FF] hover:bg-[#1E90FF] hover:text-[#E6F0FF]"
                  }`}
                >
                  한국어
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* STEP 6: Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-[#E6F0FF] p-2 hover:text-[#6EC1FF] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1E90FF] rounded-lg"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} 
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* STEP 7: Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-4 right-4 bg-[#0F2A44] rounded-2xl shadow-xl border border-[#1E90FF]/30 p-4 md:hidden">
            <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
              {NAVIGATION_LINKS.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={(e) => { handleScroll(e, link.href.substring(1)); toggleMobileMenu(); }}
                  className="text-[#E6F0FF] px-4 py-2 hover:text-[#6EC1FF] transition-colors duration-200 font-jost"
                >
                  {t(link.labelKey)}
                </a>
              ))}
              
              {/* Language Switcher - Mobile */}
              <div className="pt-2 border-t border-[#1E90FF]/20">
                <div className="text-[#E6F0FF]/60 text-xs px-4 py-1 font-jost">LANGUAGE</div>
                <div className="flex gap-2 px-4 pt-2">
                  <button
                    onClick={() => {
                      changeLanguage("EN");
                      toggleMobileMenu();
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      language === "EN"
                        ? "bg-[#1E90FF] text-[#E6F0FF]"
                        : "bg-[#0A0F1C] text-[#E6F0FF] hover:bg-[#1E90FF] hover:text-[#E6F0FF]"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage("KR");
                      toggleMobileMenu();
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      language === "KR"
                        ? "bg-[#1E90FF] text-[#E6F0FF]"
                        : "bg-[#0A0F1C] text-[#E6F0FF] hover:bg-[#1E90FF] hover:text-[#E6F0FF]"
                    }`}
                  >
                    한국어
                  </button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}