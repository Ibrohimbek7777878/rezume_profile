import React from 'react';
import { HeroSectionDOM } from './HeroSectionDOM';
import { AboutSectionDOM } from './AboutSectionDOM';
import { ExperienceSectionDOM } from './ExperienceSectionDOM';
import { SkillsSectionDOM } from './SkillsSectionDOM';
import { ProjectsSectionDOM } from './ProjectsSectionDOM';
import { EducationSectionDOM } from './EducationSectionDOM';
import { ContactSectionDOM } from './ContactSectionDOM';

export const SectionTrack: React.FC = () => {
  return (
    <div className="relative z-10 w-full">
      {/* 1. Hero Section (GPU 40,000 Particle Text + Energy Core) */}
      <HeroSectionDOM />

      {/* 2. About Section (Data Globe + Scrubbed Word Reveal + Mechanical Counters) */}
      <AboutSectionDOM />

      {/* 3. Experience Section (3D Glass Tunnel + Proximity Depth of Field + Spark) */}
      <ExperienceSectionDOM />

      {/* 4. Skills Section (Pulsing Nucleus + Multi-angle Orbiting Chips + Category Filters) */}
      <SkillsSectionDOM />

      {/* 5. Projects Section (ScrollTrigger Pin Horizontal Scroll + 3D Phone + Liquid Shaders) */}
      <ProjectsSectionDOM />

      {/* 6. Education Section (Clip-path Reveal + Nextin IT Academy + Volumetric Beam) */}
      <EducationSectionDOM />

      {/* 7. Contact & Footer Section (Magnetic Repulsion Text, Contact Orb, Confetti, Copy) */}
      <ContactSectionDOM />
    </div>
  );
};
