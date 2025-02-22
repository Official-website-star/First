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

    // 语言选择器点击事件
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownContent.classList.toggle('active');
    });

    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
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