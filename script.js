document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Language switcher
    const languageLinks = document.querySelectorAll('.dropdown-content a');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            // 这里添加语言切换逻辑
            console.log('Switching to:', lang);
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 添加滚动到顶部功能
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击返回顶部
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 添加滚动时的渐入效果
    const fadeInElements = document.querySelectorAll('.footer-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
});

// 定义语言包
const translations = {
    en: {
        home: "Home",
        aboutUs: "About Us",
        products: "Product & Services",
        esg: "ESG",
        careers: "Career",
        contactUs: "Contact Us",
        heroTitle: "Powering Sustainable Energy Futures with Intelligent Storage Solutions",
        heroSubtitle: "Innovative energy solutions powering the global shift to renewables—optimized, reliable, and built for a sustainable future.",
        engineers: "Experienced Engineers",
        storageAssets: "Energy Storage Assets",
        countries: "Countries Served",
        address: "Address",
        email: "Email",
        quickLinks: "Quick Links"
    },
    de: {
        home: "Startseite",
        aboutUs: "Über uns",
        products: "Produkte & Dienstleistungen",
        esg: "ESG",
        careers: "Karriere",
        contactUs: "Kontakt",
        heroTitle: "Nachhaltige Energiezukunft mit intelligenten Speicherlösungen",
        heroSubtitle: "Innovative Energielösungen für die globale Energiewende—optimiert, zuverlässig und für eine nachhaltige Zukunft konzipiert.",
        engineers: "Erfahrene Ingenieure",
        storageAssets: "Energiespeicher",
        countries: "Länder bedient",
        address: "Adresse",
        email: "E-Mail",
        quickLinks: "Schnellzugriff"
    }
};

// 语言切换函数
function changeLanguage(lang) {
    // 更新导航链接
    document.querySelectorAll('.nav-item').forEach(item => {
        const key = item.getAttribute('data-lang-key');
        if (key) item.textContent = translations[lang][key];
    });

    // 更新英雄区域
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) heroTitle.textContent = translations[lang].heroTitle;

    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle) heroSubtitle.textContent = translations[lang].heroSubtitle;

    // 更新统计数据描述
    document.querySelectorAll('.stat-item p').forEach((item, index) => {
        if (index === 0) item.textContent = translations[lang].engineers;
        if (index === 1) item.textContent = translations[lang].storageAssets;
        if (index === 2) item.textContent = translations[lang].countries;
    });

    // 更新页脚
    document.querySelectorAll('.footer-section h3').forEach(item => {
        if (item.textContent === "Quick Links") item.textContent = translations[lang].quickLinks;
        if (item.textContent === "Address") item.textContent = translations[lang].address;
        if (item.textContent === "Email") item.textContent = translations[lang].email;
    });

    // 存储用户语言偏好
    localStorage.setItem('preferredLanguage', lang);
}

// 初始化语言选择器
document.addEventListener('DOMContentLoaded', () => {
    // 获取语言选择链接
    const langLinks = document.querySelectorAll('.dropdown-content a');
    
    // 添加点击事件
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.getAttribute('data-lang');
            changeLanguage(lang);
        });

        // 添加悬停事件
        link.addEventListener('mouseenter', (e) => {
            const lang = link.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });

    // 加载保存的语言偏好
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLang);
}); 