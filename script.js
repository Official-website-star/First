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

    // Read More 按钮点击事件
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            const modal = this.closest('.feature-card').querySelector('.modal');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    // 关闭模态框
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
            document.body.style.overflow = '';
        });
    });

    // 点击模态框外部关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
                document.body.style.overflow = '';
            }
        });
    });
});

// 当前语言
let currentLang = localStorage.getItem('language') || 'en';

// 初始化语言
function initLanguage() {
    document.documentElement.lang = currentLang;
    if (currentLang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }
    updateContent();
}

// 更新页面内容
function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        if (translation) {
            element.textContent = translation;
        }
    });

    // 更新固定文本内容
    if (currentLang === 'ar') {
        // 更新地址显示
        const addressElements = document.querySelectorAll('[data-address], .footer-section p:not([data-i18n])');
        addressElements.forEach(element => {
            if (element.textContent.includes('Frankfurt am Main')) {
                // 只显示阿拉伯语
                element.textContent = 'فرانكفورت آم ماين';
            }
        });
        
        // 更新邮箱显示方向
        const emailElements = document.querySelectorAll('.footer-email');
        emailElements.forEach(element => {
            element.style.direction = 'ltr'; // 保持邮箱地址从左到右显示
            element.style.unicodeBidi = 'bidi-override';
        });
    } else {
        // 恢复默认地址显示
        const addressElements = document.querySelectorAll('[data-address], .footer-section p:not([data-i18n])');
        addressElements.forEach(element => {
            if (element.textContent.includes('فرانكفورت آم ماين')) {
                element.textContent = 'Frankfurt am Main';
            }
        });
    }

    // 更新页面标题
    const pageTitles = {
        'index.html': 'nav.home',
        'about.html': 'nav.about',
        'products.html': 'nav.products',
        'esg.html': 'nav.esg',
        'careers.html': 'nav.careers',
        'contact.html': 'nav.contact'
    };

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const titleKey = pageTitles[currentPage];
    if (titleKey) {
        document.title = getTranslation(titleKey) + ' - Stratosphere Green Energy';
    }
}

// 获取翻译
function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
        if (value && value[k]) {
            value = value[k];
        } else {
            return null;
        }
    }
    return value;
}

// 设置语言
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    initLanguage();
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化语言
    initLanguage();
    
    // 为所有语言切换按钮添加事件监听
    const langButtons = document.querySelectorAll('[data-lang]');
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
}); 