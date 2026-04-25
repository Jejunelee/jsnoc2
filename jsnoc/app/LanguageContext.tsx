"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'EN' | 'KR';

type Translations = {
  [key: string]: {
    EN: string;
    KR: string;
  };
};

// String translations
const translations: Translations = {
  // ============ HEADER ============
  'nav.home': { EN: 'Home', KR: '홈' },
  'nav.about': { EN: 'About Us', KR: '회사소개' },
  'nav.services': { EN: 'Services', KR: '서비스' },
  'nav.contact': { EN: 'Contact', KR: '문의하기' },

  // ============ HERO SECTION ============
  'hero.title': { 
    EN: 'Grow your business with us',
    KR: '비즈니스와의 협력으로 성장하세요'
  },
  'hero.subtitle': { 
    EN: 'Global Standards - Local Presence',
    KR: 'Global Standards · Local Presence'
  },
  'hero.description': { 
    EN: 'Delivering cutting-edge datacenter engineering, network project management, and automation solutions with unparalleled expertise and global reach.',
    KR: '최첨단 데이터센터 엔지니어링, 네트워크 프로젝트 관리, 자동화 솔루션을 전문성과 글로벌 역량으로 제공합니다.'
  },
  'hero.button': { EN: 'Explore Solutions', KR: '더 알아보기' },

  // ============ ABOUT US SECTION ============
  'about.title': { EN: 'About Us', KR: '회사소개' },
  'about.short': { 
    EN: 'JS Network Operations is a team of professionals that provides IT support services and network-related solutions nationwide. We are committed to understanding our customers\' needs and providing the necessary services in a timely manner.',
    KR: 'JS 네트워크 운영은 한국과 일본 내 서비스와 네트워크 관련 솔루션을 제공하는 전문 팀입니다. 우리는 고객의 요구를 이해하고 최적의 네트워크 서비스를 제공하기 위해 최선을 다하고 있습니다. 신뢰와 품질을 중심으로 안정적인 인프라를 구축합니다.'
  },
  'about.professional.title': { EN: 'Professional & Clean', KR: '전문적이고 체계적인 서비스' },
  'about.professional.desc': {
    EN: 'JS Network Operations (JSNOC) delivers reliable, end-to-end IT field engineering and technical support services across South Korea. We specialize in network infrastructure, on-site/remote troubleshooting, enterprise device deployment, and critical system maintenance for retail, corporate, and industrial environments.',
    KR: 'JS Network Operations(JSNOC)는 한국 전역에 안정적인 엔드투엔드 IT 현장 엔지니어링 및 기술 지원 서비스를 제공합니다. 네트워크 인프라, 현장/원격 문제 해결, 기업 장비 배포, 소매, 기업 및 산업 환경을 위한 중요한 시스템 유지 관리를 전문으로 합니다.'
  },
  'about.practical.title': { EN: 'Straightforward & Practical', KR: '간결하고 실용적인 접근' },
  'about.practical.desc': {
    EN: 'We keep your business connected by providing on-site IT support, network installation, hardware setup, and troubleshooting services across Korea—quickly and professionally. Whether you need help with servers, networking, POS systems, CCTV, or end-user devices, our field engineers deliver reliable solutions you can trust.',
    KR: '한국 전역에서 신속하고 전문적인 현장 IT 지원, 네트워크 설치, 하드웨어 설정 및 문제 해결 서비스를 제공하여 비즈니스 연결을 유지합니다. 서버, 네트워킹, POS 시스템, CCTV 또는 최종 사용자 장치에 대한 도움이 필요하시면 현장 엔지니어가 신뢰할 수 있는 솔루션을 제공합니다.'
  },
  'about.modern.title': { EN: 'Modern & Tech-Focused', KR: '현대적이고 기술 중심적인' },
  'about.modern.desc': {
    EN: 'A modern IT services company built on reliability, precision, and technical excellence. We support businesses nationwide with network engineering, infrastructure setup, system maintenance, and on-site technical response.',
    KR: '신뢰성, 정밀성 및 기술적 우수성을 기반으로 구축된 현대적인 IT 서비스 회사입니다. 네트워크 엔지니어링, 인프라 설정, 시스템 유지 관리 및 현장 기술 대응으로 전국의 비즈니스를 지원합니다.'
  },
  'about.contact.prefers': { EN: 'Prefer a call? Contact the number below.', KR: '전화가 더 편하신가요? 연락 주시면 바로 응대해드리겠습니다.' },
  'about.contact.message': { EN: 'We aim to fulfill your IT needs.', KR: '귀하의 IT 니즈를 충족시키기 위해 노력합니다.' },
  'about.button.more': { EN: 'See More', KR: '더 알아보기' },
  'about.button.less': { EN: 'See Less', KR: '접기' },

  // ============ OFFERINGS/SERVICES SECTION ============
  'offerings.title': { EN: 'Our Services', KR: '우리의 서비스' },
  
  // Service cards
  'offerings.service1.title': { EN: 'Rapid Dispatch', KR: '신속 대응' },
  'offerings.service1.desc': { 
    EN: 'On-site engineers available within 24 hours in most regions; emergency options available.',
    KR: '긴급한 문제 발생 시 24시간 이내에 현장 또는 원격으로 대응합니다.'
  },
  'offerings.service2.title': { EN: 'Remote Hands', KR: '원격 지원' },
  'offerings.service2.desc': { 
    EN: 'Smart hands for datacenters: power cycles, media swaps, cabling checks, triage, and more.',
    KR: '데이터센터 작업, 네트워크 설정, 서버 관리, 마이그레이션 등 다양한 원격 지원을 제공합니다.'
  },
  'offerings.service3.title': { EN: 'L1–L3 Desktop Support', KR: 'L1–L3 데스크탑 지원' },
  'offerings.service3.desc': { 
    EN: 'From basic break/fix to escalating, imaging, MDM, and VIP support with clear SLAs.',
    KR: '기본적인 사용자 문제 해결부터 전문적인 기술 지원까지 제공합니다.'
  },
  'offerings.service4.title': { EN: 'Local Presence', KR: '현지 지원' },
  'offerings.service4.desc': { 
    EN: 'Direct communication with the team doing the work. No opaque intermediaries or middlemen vendors.',
    KR: '작업을 수행할 현장 엔지니어를 신속하게 배치하여 효율적인 작업을 지원합니다.'
  },
  'offerings.service5.title': { EN: 'Project Management', KR: '프로젝트 관리' },
  'offerings.service5.desc': { 
    EN: 'Nationwide project management experience with clear communication channels and no language barriers.',
    KR: '전문적인 프로젝트 관리로 작업 일정과 품질을 체계적으로 관리합니다.'
  },
  'offerings.service6.title': { EN: 'IT Consulting', KR: 'IT 컨설팅' },
  'offerings.service6.desc': { 
    EN: 'Overall IT consultation with site management capabilities and long-term B2B solutions.',
    KR: '고객 환경에 맞는 최적의 IT 인프라 및 운영 전략을 제안합니다.'
  },

  // Datacenter section - Titles only
  'offerings.datacenter.title': { EN: 'Datacenter and Network Capabilities', KR: '데이터센터 및 네트워크 역량' },
  'offerings.datacenter.hands.title': { EN: 'Hands-On Experience', KR: '현장 중심 기술 경험' },
  'offerings.datacenter.process.title': { EN: 'Process and Safety', KR: '안전 및 프로세스 준수' },

  // End-user support
  'offerings.enduser.title': { EN: 'End-User Support', KR: '최종 사용자 지원' },
  'offerings.enduser.subtitle': { EN: 'Nationwide coverage for offices, retail, and warehousing.', KR: '사무실, 소매점 및 창고를 위한 전국적 커버리지' },

  // ============ CONTACT SECTION ============
  'contact.title': { EN: 'Contact Us', KR: '문의하기' },
  'contact.description': { 
    EN: 'Please use the form on the right for any inquiries you may have. We will respond to you in a timely manner.',
    KR: '질문이나 요청이 있으시면 언제든지 연락 주세요. 신속하게 답변드리겠습니다.'
  },
  'contact.company': { EN: 'Company', KR: '회사' },
  'contact.phone': { EN: 'Phone Number', KR: '연락처' },
  'contact.email': { EN: 'E-mail', KR: '이메일' },
  'contact.form.helper': { 
    EN: 'Providing a detailed explanation will enable us to help you better.',
    KR: '자세한 설명을 제공해 주시면 더 나은 도움을 드릴 수 있습니다.'
  },
  'contact.form.company': { EN: 'Company', KR: '회사' },
  'contact.form.name': { EN: 'Name', KR: '이름' },
  'contact.form.phone': { EN: 'Phone', KR: '연락처' },
  'contact.form.email': { EN: 'Email', KR: '이메일' },
  'contact.form.message': { EN: 'Message', KR: '문의' },
  'contact.form.terms': { 
    EN: 'I have read and understood the terms and privacy policy.',
    KR: '개인정보 보호정책을 읽고 이해했습니다.'
  },
  'contact.form.captcha': { EN: 'Enter code', KR: '코드 입력' },
  'contact.form.submit': { EN: 'SUBMIT', KR: '제출하기' },
  
  // ============ CONTACT FORM STATUS MESSAGES (ADDED) ============
  'contact.form.success': { 
    EN: 'Message sent successfully! We\'ll get back to you soon.', 
    KR: '메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.' 
  },
  'contact.form.error': { 
    EN: 'Failed to send message. Please try again.', 
    KR: '메시지 전송에 실패했습니다. 다시 시도해 주세요.' 
  },
  'contact.form.acceptTermsError': { 
    EN: 'Please accept the terms and conditions', 
    KR: '이용약관에 동의해 주세요' 
  },

  // ============ CTA SECTION ============
  'cta.title': { EN: 'Prefer a call?', KR: '전화가 더 편하신가요?' },
  'cta.description': { EN: 'Contact us and we will respond immediately.', KR: '연락 주시면 바로 응대해드리겠습니다.' },
  'cta.button': { EN: 'Call us now', KR: '전화 상담 받기' },

  // ============ FOOTER ============
  'footer.contact': { EN: 'Contact', KR: 'Contact' },
  'footer.company': { EN: 'JS Network Operations', KR: 'JS 네트워크 운영' },
  'footer.navigation': { EN: 'Site Navigation', KR: 'Site Navigation' },
  'footer.others': { EN: 'Others', KR: 'Others' },
  'footer.language': { EN: 'Language', KR: 'Language' },
  'footer.about': { EN: 'About Us', KR: '회사소개' },
  'footer.services': { EN: 'Services', KR: '서비스' },
  'footer.contactus': { EN: 'Contact Us', KR: '문의하기' },
  'footer.legal': { EN: 'Legal Notice', KR: 'Legal Notice' },
  'footer.privacy': { EN: 'Privacy Policy', KR: 'Privacy Policy' },
  'footer.terms': { EN: 'Terms of Use', KR: 'Terms of Use' },
  'footer.copyright': { EN: 'All rights reserved.', KR: 'All rights reserved.' },
  'footer.bottom.text': { 
    EN: 'JS Network Operations provides IT field engineering and technical support services across South Korea.',
    KR: 'JS Network Operations는 한국 전역에 IT 현장 엔지니어링 및 기술 지원 서비스를 제공합니다.'
  },
};

// Array translations (for lists)
type ArrayTranslations = {
  [key: string]: {
    EN: string[];
    KR: string[];
  };
};

const arrayTranslations: ArrayTranslations = {
  'offerings.datacenter.hands.items': {
    EN: [
      '12+ years across colos and enterprise sites throughout Korea',
      'Racking, stacking, labeling, and cable management',
      'Hardware swaps, disk & PSU replacements',
      'Network troubleshooting, cable tracing, and port turn-ups'
    ],
    KR: [
      '다양한 환경에서 축적된 경험을 바탕으로 안정적인 기술 지원을 제공합니다.',
      '서버 설치, 랙 작업, 케이블링 등 다양한 데이터센터 작업 지원이 가능합니다.',
      '하드웨어 교체, 디스크 및 PSU 교체',
      '네트워크 문제 해결, 케이블 추적 및 포트 설정'
    ]
  },
  'offerings.datacenter.process.items': {
    EN: [
      'Method statements, checklists, and photo logs to ensure consistency and compliance',
      'EHS-aware procedures and PPE',
      'Change control and work approvals',
      'Assets, cabling, and rack documentation'
    ],
    KR: [
      '표준 작업 절차를 준수하며 안전한 작업 환경을 유지합니다.',
      '변경 관리(Change Control) 및 승인 절차를 철저히 따릅니다.',
      '작업 승인 및 변경 관리',
      '자산, 케이블링 및 랙 문서화'
    ]
  },
  'offerings.enduser.items': {
    EN: [
      'New site turn-ups and migration',
      'Imaging, MDM enrollment, and peripherals',
      'Ticketing integration and reporting'
    ],
    KR: [
      '신규 사이트 구축 및 유지보수 작업 지원',
      '이미징, MDM 등록 및 주변기기 설정',
      '티켓팅 통합 및 보고 시스템'
    ]
  },
  // Services array (if needed for mapping)
  'offerings.servicesList': {
    EN: [
      'Rapid Dispatch',
      'Remote Hands',
      'L1–L3 Desktop Support',
      'Local Presence',
      'Project Management',
      'IT Consulting'
    ],
    KR: [
      '신속 대응',
      '원격 지원',
      'L1–L3 데스크탑 지원',
      '현지 지원',
      '프로젝트 관리',
      'IT 컨설팅'
    ]
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const tArray = (key: string): string[] => {
    return arrayTranslations[key]?.[language] || [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}