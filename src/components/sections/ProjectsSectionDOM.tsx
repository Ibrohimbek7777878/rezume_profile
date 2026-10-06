import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '../../store/useStore';

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  desc: string;
  tags: string[];
  metrics: string[];
  hasPhoneMockup?: boolean;
  linkText: string;
  url: string;
  colorScheme: {
    badge: string;
    border: string;
    gradient: string;
    glow: string;
  };
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'bittada-usta',
    category: 'Mebel City Ekotizimi • Android & Web',
    title: 'Bittada Usta',
    tagline: 'Mebel ustalari uchun professional platforma va Google Play ilovasi',
    desc: 'Backend va web frontend to‘liq noldan ishlab chiqildi. Google Play’da rasmiy Android ilovasi e’lon qilindi. Online to‘lov tizimlari (Payme, Click) integratsiyasi va buyurtmalar taqsimlash moduli amalga oshirilgan.',
    tags: ['Node.js', 'React', 'Next.js', 'Android', 'PostgreSQL', 'Online To‘lov'],
    metrics: ['Google Play da faol', 'Online to‘lov integratsiyasi', 'Real vaqt buyurtmalari'],
    hasPhoneMockup: true,
    linkText: 'Ilovani ko‘rish',
    url: 'https://usta.bittada.uz',
    colorScheme: {
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      border: 'hover:border-cyan-400/60',
      gradient: 'from-cyan-500/10 via-transparent to-transparent',
      glow: 'shadow-[0_0_40px_rgba(56,189,248,0.15)]',
    },
  },
  {
    id: 'mebel-city',
    category: 'Ekotizim Portali',
    title: 'Mebel City',
    tagline: 'Mebel buyurtmalari va mijozlar katalogini birlashtiruvchi ekotizim',
    desc: 'Real foydalanuvchilar ishlatayotgan keng ko‘lamli mahsulot. Katalog boshqaruvi, usta va mijoz o‘rtasidagi to‘g‘ridan-to‘g‘ri shaffof aloqa, sotuv yo‘nalishini kengaytirish arxitekturasi.',
    tags: ['React', 'Next.js', 'Node.js', 'REST API', 'TailwindCSS'],
    metrics: ['2+ yillik real mahsulot', 'Katalog & Sotuv moduli', 'Yuqori yuklamaga mos'],
    linkText: 'Loyihani o‘rganish',
    url: 'https://mebelcity.bittada.uz',
    colorScheme: {
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      border: 'hover:border-emerald-400/60',
      gradient: 'from-emerald-500/10 via-transparent to-transparent',
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.15)]',
    },
  },
  {
    id: 'bittada-erp',
    category: 'Yirik Korxona Boshqaruvi',
    title: 'Bittada ERP',
    tagline: 'Mebel ishlab chiqarish, logistika va kassa jarayonlari ERP tizimi',
    desc: 'Jamoaviy tarzda ishlab chiqilayotgan yirik tizim. Ishlab chiqarish bosqichlari, ombor qoldig‘i, ishchilar KPI si va online to‘lov oqimlarini markazlashgan holda boshqarish.',
    tags: ['Next.js', 'Django / Python', 'PostgreSQL', 'Redis', 'To‘lov Tizimlari'],
    metrics: ['Ishlab chiqarish nazorati', 'To‘liq kassa & ombor', 'Jamoaviy arxitektura'],
    linkText: 'GitHub repozitoriy',
    url: 'https://github.com/Ibrohimbek7777878',
    colorScheme: {
      badge: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
      border: 'hover:border-violet-400/60',
      gradient: 'from-violet-500/10 via-transparent to-transparent',
      glow: 'shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    },
  },
  {
    id: 'stratix-accounting',
    category: 'Stratix System • Moliyaviy Texnologiyalar',
    title: 'Online Buxgalteriya ERP',
    tagline: 'Korxonalar uchun moliyaviy oqimlar va hisob-kitobni avtomatlashtirish',
    desc: 'Texnik topshiriq (TZ) tuzishdan tortib serverga joylashgacha bo‘lgan barcha bosqichlarda boshchilik qildim. Online to‘lov tizimlari ulandi, server konfiguratsiyasi to‘liq ishga tushirildi.',
    tags: ['Python', 'Django', 'PostgreSQL', 'Online To‘lov', 'Docker', 'Linux Server'],
    metrics: ['Serverga muvaffaqiyatli deploy', 'Online to‘lov tizimlari', 'TZ & Tizim arxitekturasi'],
    linkText: 'GitHub repozitoriy',
    url: 'https://github.com/Ibrohimbek7777878',
    colorScheme: {
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      border: 'hover:border-indigo-400/60',
      gradient: 'from-indigo-500/10 via-transparent to-transparent',
      glow: 'shadow-[0_0_40px_rgba(99,102,241,0.15)]',
    },
  },
  {
    id: 'stratix-medical',
    category: 'Stratix System • Tibbiyot IT',
    title: 'Online Meditsina ERP',
    tagline: 'Klinikalar va tibbiyot markazlari uchun kompleks boshqaruv platformasi',
    desc: 'Bemorlar qabuli, shifokorlar jadvali, ambulator kartalar va dorixona omborini o‘z ichiga olgan tibbiy ERP platformasi. Loyihani boshidan to‘liq yetkazib berishda asosiy mas’ul dasturchi.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Role-based Auth'],
    metrics: ['Klinika operatsiyalari', 'Elektron tibbiy karta', 'Tezkor ma’lumotlar almashinuvi'],
    linkText: 'GitHub repozitoriy',
    url: 'https://github.com/Ibrohimbek7777878',
    colorScheme: {
      badge: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      border: 'hover:border-teal-400/60',
      gradient: 'from-teal-500/10 via-transparent to-transparent',
      glow: 'shadow-[0_0_40px_rgba(20,184,166,0.15)]',
    },
  },
  {
    id: 'stratix-corp-edu',
    category: 'Korporativ & Ta’lim',
    title: 'Stratix Web & Telegram Platform',
    tagline: 'Kompaniya rasmiy veb-sayti va ta’lim o‘quv markazi bot platformalari',
    desc: 'Stratix System kompaniyasining to‘liq ishga tushgan korporativ sayti hamda Guliston IT Academy uchun o‘quvchilarni ro‘yxatga olish va monitoring qiluvchi Telegram bot ekotizimi.',
    tags: ['Next.js', 'Telegram Bot API', 'Python', 'TailwindCSS'],
    metrics: ['100% ishlab turgan sayt', 'Avtomatlashtirilgan CRM', 'Tezkor ma’lumotlar'],
    linkText: 'Telegram botni ochish',
    url: 'https://t.me/mebelcity_bittada_bot',
    colorScheme: {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      border: 'hover:border-amber-400/60',
      gradient: 'from-amber-500/10 via-transparent to-transparent',
      glow: 'shadow-[0_0_40px_rgba(245,158,11,0.15)]',
    },
  },
];

export const ProjectsSectionDOM: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [skewDeg, setSkewDeg] = useState(0);

  // Synchronize ScrollTrigger Pinned Horizontal Scroll
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let ctx = gsap.context(() => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth;
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    // Dynamic SkewX based on scroll velocity
    let animFrame: number;
    const updateSkew = () => {
      const velocity = useStore.getState().scrollVelocity;
      // Clamp between -20 and 20 degrees
      const targetSkew = Math.max(-20, Math.min(20, velocity * 0.12));
      setSkewDeg((prev) => prev + (targetSkew - prev) * 0.15);
      animFrame = requestAnimationFrame(updateSkew);
    };
    animFrame = requestAnimationFrame(updateSkew);

    return () => {
      cancelAnimationFrame(animFrame);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full h-screen overflow-hidden bg-navy-950/80 z-20 pointer-events-auto select-none"
    >
      {/* Background Kinetic Outline Marquee "PROJECTS" with Velocity SkewX */}
      <div
        ref={marqueeRef}
        style={{
          transform: `translateY(-50%) skewX(${skewDeg.toFixed(2)}deg)`,
          transition: 'transform 0.05s ease-out',
        }}
        className="absolute top-1/2 left-0 w-full pointer-events-none -z-10 opacity-15 whitespace-nowrap overflow-hidden select-none"
      >
        <span className="font-heading font-black text-[18vw] leading-none tracking-tighter text-transparent stroke-outline uppercase">
          PROJECTS • AMALIY LOYIHALAR • CASES • PRODUCTION • INNOVATION • PROJECTS •
        </span>
      </div>

      {/* Top Header Tag */}
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 md:left-20 z-30 flex items-center gap-3 sm:gap-4">
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cyan-400 px-2.5 sm:px-3 py-1 rounded-full border border-cyan-400/30 bg-slate-900/60 backdrop-blur-md">
          [ 05 / 07 ] — PRODUCTION ARCHIVE
        </span>
        <span className="hidden md:inline-block text-xs text-slate-400 font-mono">
          Gorizontal harakat • Skroll bilan 360° ko‘rish
        </span>
      </div>

      {/* Horizontal Track of Project Cards */}
      <div
        ref={trackRef}
        className="flex h-full items-center pl-4 sm:pl-8 md:pl-20 pr-16 sm:pr-28 md:pr-40 gap-4 sm:gap-8 md:gap-14 will-change-transform pt-12 sm:pt-0"
      >
        {/* Intro Card */}
        <div className="flex-shrink-0 w-[260px] sm:w-[320px] md:w-[380px] space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white font-heading tracking-tight leading-tight">
            Amaliy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
              Loyihalar
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Real foydalanuvchilar, korxonalar va mebel ishlab chiqaruvchilar uchun yaratilgan to‘liq siklli raqamli mahsulotlar:
            arxitekturadan tortib mobil ilova va online to‘lovlargacha.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Skroll qiling →</span>
          </div>
        </div>

        {/* Project Cards */}
        {PROJECTS_DATA.map((proj, idx) => (
          <div
            key={proj.id}
            data-cursor="Ko‘rish"
            onClick={() => window.open(proj.url, '_blank')}
            className={`group relative flex-shrink-0 w-[84vw] max-w-[320px] sm:max-w-[400px] md:max-w-[480px] h-[510px] sm:h-[560px] md:h-[620px] rounded-3xl p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-500 backdrop-blur-xl border border-slate-700/60 bg-gradient-to-b ${proj.colorScheme.gradient} hover:bg-slate-900/80 ${proj.colorScheme.border} ${proj.colorScheme.glow} shadow-2xl cursor-pointer`}
          >
            {/* Top Bar inside card */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full border ${proj.colorScheme.badge}`}
                >
                  {proj.category}
                </span>
                <span className="font-mono text-xs text-slate-500 font-bold">
                  0{idx + 1} / 0{PROJECTS_DATA.length}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                {proj.title}
              </h3>

              <p className="text-cyan-400/90 text-xs md:text-sm font-medium">
                {proj.tagline}
              </p>

              <p className="text-slate-300/80 text-xs md:text-sm leading-relaxed font-light">
                {proj.desc}
              </p>
            </div>

            {/* Special 3D Phone notice for Bittada Usta */}
            {proj.hasPhoneMockup && (
              <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300 text-sm">
                    📱
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Google Play Market</p>
                    <p className="text-[10px] text-cyan-400 font-mono">3D interaktiv telefon maketi</p>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">360° spin</span>
              </div>
            )}

            {/* Metrics */}
            <div className="space-y-2 py-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                Natijalar & Yutuqlar:
              </span>
              <div className="flex flex-wrap gap-2">
                {proj.metrics.map((m, mIdx) => (
                  <span
                    key={mIdx}
                    className="text-[11px] font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/50 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack & Action Button */}
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-white font-medium group-hover:text-cyan-400 transition-colors">
                  {proj.linkText}
                </span>

                {/* Flying Arrow Icon that animates to corner on hover */}
                <div className="w-10 h-10 rounded-full bg-slate-800/90 border border-slate-700 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-navy-950 text-white flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 overflow-hidden">
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-base">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
