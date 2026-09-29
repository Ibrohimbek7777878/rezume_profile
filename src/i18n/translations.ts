export type Language = 'en' | 'uz' | 'ru' | 'tr';

export interface TranslationDictionary {
  navAbout: string;
  navExperience: string;
  navSkills: string;
  navProjects: string;
  navEducation: string;
  navContact: string;
  heroStatus: string;
  heroRole: string;
  heroLocation: string;
  heroSlogan: string;
  btnContact: string;
  btnResume: string;
  contactTitle: string;
  contactSubtitle: string;
  copiedToast: string;
  contactSalary: string;
  salaryNegotiable: string;
  contactLocation: string;
  btnTelegram: string;
  btnGithub: string;
  btnLinkedin: string;
  btnCall: string;
  footerRights: string;
  backToTop: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  uz: {
    navAbout: "Men haqimda",
    navExperience: "Tajriba",
    navSkills: "Ko‘nikmalar",
    navProjects: "Loyihalar",
    navEducation: "Ta‘lim",
    navContact: "Aloqa",
    heroStatus: "Yangi takliflar va loyihalar uchun ochiq",
    heroRole: "Full Stack Dasturchi",
    heroLocation: "Sirdaryo, O‘zbekiston",
    heroSlogan: "G‘oyani noldan boshlab mustahkam arxitektura, yuqori unumdor backend, zamonaviy web interfeys va mobil ilovagacha to‘liq yetkazib beruvchi mutaxassis.",
    btnContact: "Bog‘lanish",
    btnResume: "Rezyume (PDF)",
    contactTitle: "Keling, birga quramiz",
    contactSubtitle: "Yangi loyihalar, startup MVP yoki jamoangizga mas'uliyatli Full Stack dasturchi kerak bo‘lsa, to‘g‘ridan-to‘g‘ri bog‘lanishingiz mumkin.",
    copiedToast: "Nusxalandi ✓",
    contactSalary: "Maosh kutmasi",
    salaryNegotiable: "600$+ Kelishiladi",
    contactLocation: "Sirdaryo / Toshkent, O‘zbekiston",
    btnTelegram: "Telegram (@sultonbe78)",
    btnGithub: "GitHub (@Ibrohimbek7777878)",
    btnLinkedin: "LinkedIn (Ibrohim Sultonov)",
    btnCall: "+998 94 951 80 03",
    footerRights: "Ibrohim Sultonov. Barcha huquqlar himoyalangan.",
    backToTop: "Yuqoriga 🚀",
  },
  en: {
    navAbout: "About",
    navExperience: "Experience",
    navSkills: "Skills",
    navProjects: "Projects",
    navEducation: "Education",
    navContact: "Contact",
    heroStatus: "Open for Opportunities & Projects",
    heroRole: "Full Stack Developer",
    heroLocation: "Sirdaryo, Uzbekistan",
    heroSlogan: "Specializing in taking concepts from scratch to robust architecture, high-performance backends, modern interactive frontends, and production mobile applications.",
    btnContact: "Get In Touch",
    btnResume: "Download CV (PDF)",
    contactTitle: "Let's Build Together",
    contactSubtitle: "Whether you have a startup MVP to launch, an enterprise ERP to scale, or need a versatile Full Stack engineer in your team, let's connect.",
    copiedToast: "Copied ✓",
    contactSalary: "Salary Expectation",
    salaryNegotiable: "$600+ Negotiable",
    contactLocation: "Sirdaryo / Tashkent, Uzbekistan",
    btnTelegram: "Telegram (@sultonbe78)",
    btnGithub: "GitHub (@Ibrohimbek7777878)",
    btnLinkedin: "LinkedIn (Ibrohim Sultonov)",
    btnCall: "+998 94 951 80 03",
    footerRights: "Ibrohim Sultonov. All rights reserved.",
    backToTop: "Back to Top 🚀",
  },
  ru: {
    navAbout: "Обо мне",
    navExperience: "Опыт",
    navSkills: "Навыки",
    navProjects: "Проекты",
    navEducation: "Образование",
    navContact: "Контакты",
    heroStatus: "Открыт для предложений и проектов",
    heroRole: "Full Stack Разработчик",
    heroLocation: "Сырдарья, Узбекистан",
    heroSlogan: "Специализируюсь на создании продуктов с нуля: надежная архитектура, производительный бэкенд, интерактивный фронтенд и мобильные приложения.",
    btnContact: "Связаться",
    btnResume: "Резюме (PDF)",
    contactTitle: "Давайте строить вместе",
    contactSubtitle: "Если вам требуется сильный Full Stack разработчик для стартапа, ERP или корпоративного проекта — напишите мне.",
    copiedToast: "Скопировано ✓",
    contactSalary: "Ожидания по зарплате",
    salaryNegotiable: "600$+ Договорная",
    contactLocation: "Сырдарья / Ташкент, Узбекистан",
    btnTelegram: "Telegram (@sultonbe78)",
    btnGithub: "GitHub (@Ibrohimbek7777878)",
    btnLinkedin: "LinkedIn (Иброхим Султонов)",
    btnCall: "+998 94 951 80 03",
    footerRights: "Иброхим Султонов. Все права защищены.",
    backToTop: "Наверх 🚀",
  },
  tr: {
    navAbout: "Hakkımda",
    navExperience: "Deneyim",
    navSkills: "Yetenekler",
    navProjects: "Projeler",
    navEducation: "Eğitim",
    navContact: "İletişim",
    heroStatus: "Yeni Fırsatlara ve Projelere Açık",
    heroRole: "Full Stack Geliştirici",
    heroLocation: "Sirdaryo, Özbekistan",
    heroSlogan: "Fikirleri sıfırdan alıp sağlam mimari, yüksek performanslı backend, modern frontend ve mobil uygulamalara dönüştüren Full Stack uzmanı.",
    btnContact: "İletişime Geç",
    btnResume: "Özgeçmiş (PDF)",
    contactTitle: "Birlikte İnşa Edelim",
    contactSubtitle: "Ekibiniz için yetenekli bir Full Stack yazılımcı arıyorsanız veya yeni bir projeye başlıyorsanız hemen iletişime geçin.",
    copiedToast: "Kopyalandı ✓",
    contactSalary: "Maaş Beklentisi",
    salaryNegotiable: "600$+ Görüşülür",
    contactLocation: "Sirdaryo / Taşkent, Özbekistan",
    btnTelegram: "Telegram (@sultonbe78)",
    btnGithub: "GitHub (@Ibrohimbek7777878)",
    btnLinkedin: "LinkedIn (Ibrohim Sultonov)",
    btnCall: "+998 94 951 80 03",
    footerRights: "Ibrohim Sultonov. Tüm hakları saklıdır.",
    backToTop: "Yukarı Çık 🚀",
  },
};
