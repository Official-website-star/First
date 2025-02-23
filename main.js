// 添加导航栏交互功能
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const languageBtn = document.querySelector('.language-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // 设置当前页面的导航项激活状态
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });

    // 添加汉堡菜单点击事件
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 语言按钮点击事件
    if (languageBtn && dropdownContent) {
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('active');
            dropdownContent.classList.toggle('active');
        });

        // 点击语言选项
        const languageOptions = document.querySelectorAll('.dropdown-content a');
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const lang = this.getAttribute('data-lang');
                languageBtn.textContent = this.textContent;
                changeLanguage(lang);
                dropdownContent.classList.remove('active');
                languageBtn.classList.remove('active');
            });
        });
    }

    // 点击其他区域关闭菜单
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
        if (languageBtn && !languageBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
            languageBtn.classList.remove('active');
            dropdownContent.classList.remove('active');
        }
    });

    // 阻止下拉菜单点击事件冒泡
    dropdownContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// 语言切换功能
function changeLanguage(lang) {
    // 保存语言选择到本地存储
    localStorage.setItem('selectedLanguage', lang);
    
    // 更新语言按钮文本
    const languageBtn = document.querySelector('.language-btn');
    const selectedLang = document.querySelector(`[data-lang="${lang}"]`);
    if (languageBtn && selectedLang) {
        languageBtn.textContent = selectedLang.textContent;
    }

    // 加载对应语言的翻译
    const translations = {
        'en': {
            'contact.title': 'Contact Us',
            'contact.hero.question': 'Want to learn more about how Stratosphere can power your renewable energy projects?',
            'contact.hero.action': 'Get in touch with us today for tailored energy storage solutions and expert operations support.',
            'contact.company.title': 'Stratosphere Green Energy GmbH',
            'contact.company.email.title': 'Email',
            'nav.home': 'Home',
            'nav.about': 'About Us',
            'nav.products': 'Product & Services',
            'nav.esg': 'ESG',
            'nav.careers': 'Careers',
            'nav.contact': 'Contact Us'
        },
        'de': {
            'contact.title': 'Kontakt',
            'contact.hero.question': 'Möchten Sie mehr darüber erfahren, wie Stratosphere Ihre erneuerbaren Energieprojekte unterstützen kann?',
            'contact.hero.action': 'Kontaktieren Sie uns noch heute für maßgeschneiderte Energiespeicherlösungen und professionelle Betriebsunterstützung.',
            'contact.company.title': 'Stratosphere Green Energy GmbH',
            'contact.company.email.title': 'E-Mail',
            'nav.home': 'Startseite',
            'nav.about': 'Über uns',
            'nav.products': 'Produkte & Dienstleistungen',
            'nav.esg': 'ESG',
            'nav.careers': 'Karriere',
            'nav.contact': 'Kontakt'
        },
        'ar': {
            'contact.title': 'اتصل بنا',
            'contact.hero.question': 'هل تريد معرفة المزيد عن كيف يمكن لـ Stratosphere دعم مشاريع الطاقة المتجددة الخاصة بك؟',
            'contact.hero.action': 'تواصل معنا اليوم للحصول على حلول تخزين الطاقة المخصصة ودعم العمليات الخبير.',
            'contact.company.title': 'Stratosphere Green Energy GmbH',
            'contact.company.email.title': 'البريد الإلكتروني',
            'nav.home': 'الرئيسية',
            'nav.about': 'من نحن',
            'nav.products': 'المنتجات والخدمات',
            'nav.esg': 'ESG',
            'nav.careers': 'الوظائف',
            'nav.contact': 'اتصل بنا'
        }
    };

    // 更新页面上的所有文本
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 更新导航项文本
    document.querySelectorAll('.nav-item').forEach(item => {
        const key = `nav.${item.getAttribute('href').split('.')[0]}`;
        if (translations[lang] && translations[lang][key]) {
            item.textContent = translations[lang][key];
        }
    });
}

// 加载页面时检查并应用已保存的语言设置
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
        
        // 更新语言按钮文本
        const languageBtn = document.querySelector('.language-btn');
        const selectedLang = document.querySelector(`[data-lang="${savedLanguage}"]`);
        if (languageBtn && selectedLang) {
            languageBtn.textContent = selectedLang.textContent;
        }
    }
}); 