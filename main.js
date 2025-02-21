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

    // 汉堡菜单点击事件
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('Toggle clicked'); // 调试用
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

    // 点击导航链接后关闭菜单
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 阻止下拉菜单点击事件冒泡
    dropdownContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}); 