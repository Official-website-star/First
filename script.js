document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageBtn = document.querySelector('.language-btn');

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // 汉堡按钮点击事件
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // 切换body滚动
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            // 关闭导航菜单时同时关闭语言下拉菜单
            languageDropdown.classList.remove('active');
        }
    });

    // 点击遮罩层关闭导航菜单
    overlay.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        languageDropdown.classList.remove('active');
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

    // 点击导航链接时关闭菜单
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 语言按钮点击事件
    if (languageBtn) {
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
    }

    // 点击语言选项
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            // 更新语言
            document.documentElement.lang = lang;
            // 关闭下拉菜单
            languageDropdown.classList.remove('active');
        });
    });

    // 点击其他区域关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });
});

// 当前语言
let currentLang = 'en';  // 默认设置为英语

// 如果本地存储有语言设置，则使用存储的语言
if (localStorage.getItem('language')) {
    currentLang = localStorage.getItem('language');
} else {
    localStorage.setItem('language', 'en');  // 如果没有设置，存储默认语言
}

// 设置语言
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    forceUpdateContent();
}

// 重置所有翻译状态
function resetTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.removeAttribute('data-current-lang');
    });
}

// 强制更新所有文本内容
function forceUpdateContent() {
    // 清除可能的缓存
    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = '';
    });
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, currentLang);
        if (translation) {
            element.textContent = translation;
        }
    });

    // 特殊处理邮箱链接，保持其原有的href属性
    document.querySelectorAll('a[href^="mailto:"]').forEach(element => {
        element.href = element.href; // 保持mailto链接不变
    });
}

// 更新语言按钮状态
function updateLanguageButtons() {
    document.querySelectorAll('[data-lang]').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-lang') === currentLang);
    });
    
    const languageBtn = document.querySelector('.language-btn span');
    if (languageBtn) {
        const translation = translations[currentLang]?.nav?.language;
        if (translation) {
            languageBtn.textContent = translation;
        }
    }
}

// 初始化语言
function initLanguage() {
    document.documentElement.lang = currentLang;
    forceUpdateContent();
}

// 获取翻译
function getTranslation(key, lang) {
    try {
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // 如果找不到翻译，尝试使用英语作为后备
                if (lang !== 'en') {
                    return getTranslation(key, 'en');
                }
                console.warn(`Translation missing for key: ${key} in language: ${lang}`);
                return null;
            }
        }
        return value;
    } catch (error) {
        console.error(`Error getting translation for key: ${key}`, error);
        // 发生错误时尝试使用英语
        if (lang !== 'en') {
            return getTranslation(key, 'en');
        }
        return null;
    }
}

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 设置初始语言
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    
    // 为所有语言切换按钮添加事件监听
    const langButtons = document.querySelectorAll('[data-lang]');
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = button.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

function changeLanguage(lang) {
    // 保存选择的语言到 localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // 设置语言和方向
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // 更新语言按钮文本
    const languageBtn = document.querySelector('.language-btn span');
    if (languageBtn) {
        const translation = translations[lang].nav.language;
        languageBtn.textContent = translation;
    }
    
    // 更新所有翻译内容
    updatePageContent(lang);
}

// 页面加载时初始化语言设置
document.addEventListener('DOMContentLoaded', function() {
    // 获取保存的语言设置，如果没有则默认使用英语
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    // 设置语言和方向
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // 更新语言按钮文本
    const languageBtn = document.querySelector('.language-btn span');
    if (languageBtn) {
        const translation = translations[savedLanguage].nav.language;
        languageBtn.textContent = translation;
    }
    
    // 更新所有翻译内容
    updatePageContent(savedLanguage);
});

// 更新页面内容的函数
function updatePageContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
                // 特殊处理地址文本
                if (key === 'footer.addressText') {
                    element.style.direction = lang === 'ar' ? 'rtl' : 'ltr';
                    element.style.textAlign = lang === 'ar' ? 'right' : 'left';
                    element.style.display = 'block';
                }
            }
        }
    });
}

// 语言切换功能
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        
        // 保存语言选择
        localStorage.setItem('selectedLanguage', lang);
        
        // 更新页面语言
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // 更新翻译
        updateTranslations(lang);
        
        // 关闭导航菜单
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const overlay = document.querySelector('.nav-overlay');
        
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        overlay.classList.remove('active');
    });
}); 