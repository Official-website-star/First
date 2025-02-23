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
            // 切换按钮和导航菜单的激活状态
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // 设置导航菜单的高度
            if (navLinks.classList.contains('active')) {
                navLinks.style.height = 'calc(100vh - 60px)';
            } else {
                navLinks.style.height = '0';
            }
        });
    }

    // 语言按钮点击事件
    if (languageBtn) {
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

    // 点击其他区域关闭语言选择器
    document.addEventListener('click', function(e) {
        if (languageBtn && !languageBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
            languageBtn.classList.remove('active');
            dropdownContent.classList.remove('active');
        }
    });

    // 点击导航链接时关闭菜单
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navLinks.style.height = '0';
        });
    });

    // 阻止下拉菜单点击事件冒泡
    dropdownContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// 语言切换函数
function changeLanguage(lang) {
    // 保存语言选择到本地存储
    localStorage.setItem('selectedLanguage', lang);
    
    // 加载对应语言的翻译
    loadTranslations(lang);
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