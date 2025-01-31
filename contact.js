document.addEventListener('DOMContentLoaded', function() {
    // 获取所有语言按钮
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // 为每个按钮添加点击事件
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 获取选择的语言
            const lang = this.getAttribute('data-lang');
            
            // 保存语言选择到 localStorage
            localStorage.setItem('language', lang);
            
            // 立即应用语言设置
            setLanguage(lang);
            
            // 延迟一下跳转，确保语言设置已保存
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 100);
            
            // 阻止默认行为，由我们控制跳转
            e.preventDefault();
        });
    });
}); 