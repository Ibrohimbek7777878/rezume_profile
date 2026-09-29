import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SlotCounter } from '../ui/SlotCounter';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_PARAGRAPH = "2 yildan ortiq tajribaga ega Full Stack dasturchi. Backendda Node.js va Python (Django), ma'lumotlar bazasida PostgreSQL, frontendda React va Next.js bilan ishlayman. G‘oyani noldan boshlab, ya‘ni texnik topshiriq (TZ), arxitektura, backend, interfeys, mobil ilova, onlayn to'lovlar va foydalanuvchiga yetkazishgacha mustaqil olib chiqa olaman. Hozirda Mebel City kompaniyasida real foydalanuvchilar ishlatayotgan mahsulotlarni yaratyapman.";

export const AboutSectionDOM: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  // 1. Word-by-word scrub reveal (opacity 0.15 -> 1.0)
  useEffect(() => {
    if (!textContainerRef.current) return;
    const words = textContainerRef.current.querySelectorAll('.scrub-word');

    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: true,
        },
      }
    );
  }, []);

  // 2. 3D Tilt on Avatar Card
  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    avatarRef.current.style.transform = `perspective(600px) rotateX(${-y * 0.12}deg) rotateY(${x * 0.12}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleAvatarMouseLeave = () => {
    if (avatarRef.current) {
      avatarRef.current.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-6xl mx-auto py-24 select-none relative z-10 pointer-events-auto"
    >
      <div className="space-y-3 mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
          [ 02 / 07 ] — PROFIL VA MAQSAD
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white font-heading">
          Men Haqimda
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Word-by-word Scrub Text */}
        <div ref={textContainerRef} className="lg:col-span-8 bg-navy-950/40 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-md">
          <p className="text-xl md:text-3xl font-light leading-relaxed text-slate-200">
            {ABOUT_PARAGRAPH.split(' ').map((word, i) => (
              <span key={i} className="scrub-word inline-block mr-2 opacity-15 transition-opacity duration-75">
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Right: 3D Tilt Executive Corporate Brand Emblem */}
        <div className="lg:col-span-4 flex justify-center">
          <div
            ref={avatarRef}
            onMouseMove={handleAvatarMouseMove}
            onMouseLeave={handleAvatarMouseLeave}
            className="w-56 h-56 md:w-72 md:h-72 rounded-3xl bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-navy-950/95 border-2 border-slate-700/80 hover:border-cyan-400/70 p-2 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out cursor-pointer group"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="w-full h-full rounded-[20px] bg-slate-950/90 flex flex-col items-center justify-between p-6 border border-white/10 relative overflow-hidden backdrop-blur-xl">
              {/* Top Verified Corporate Badge */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  VERIFIED ARCHITECT
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  UZ • 2026
                </span>
              </div>

              {/* Center Large Brand "IS" Monogram */}
              <div className="my-auto text-center">
                <span className="font-heading font-black text-6xl md:text-8xl tracking-tighter bg-gradient-to-br from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent block leading-none select-none group-hover:scale-105 transition-transform duration-300">
                  IS
                </span>
              </div>

              {/* Bottom Executive Subtext */}
              <div className="w-full text-center border-t border-slate-800/80 pt-2.5">
                <span className="text-xs font-heading font-bold text-white tracking-wider block">
                  IBROHIM SULTONOV
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mt-0.5">
                  Full Stack Engineer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mechanical Slot Counters for 3 Numbers: (2+, 4, 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        {/* Stat 1 */}
        <div className="bg-navy-950/60 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-md flex items-center gap-5">
          <SlotCounter value={2} suffix="+" />
          <div>
            <h4 className="text-lg font-bold text-white font-heading">Yil Tajriba</h4>
            <p className="text-xs text-slate-400">Umumiy dasturlash faoliyati</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-navy-950/60 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-md flex items-center gap-5">
          <SlotCounter value={4} />
          <div>
            <h4 className="text-lg font-bold text-white font-heading">Asosiy Mahsulot</h4>
            <p className="text-xs text-slate-400">Ishlab chiqarishdagi real tizimlar</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-navy-950/60 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-md flex items-center gap-5">
          <SlotCounter value={1} />
          <div>
            <h4 className="text-lg font-bold text-white font-heading">Google Play Ilovasi</h4>
            <p className="text-xs text-slate-400">E'lon qilingan Android dastur</p>
          </div>
        </div>
      </div>
    </section>
  );
};
