document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('applyModal');
    const closeBtn = modal.querySelector('.modal-close');
    const applyButtons = document.querySelectorAll('.apply-btn');
    
    // 显示模态框
    function showModal() {
        modal.classList.add('show');
        // 强制更新翻译
        updateTranslations();
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    // 隐藏模态框
    function hideModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // 打开模态框函数
    window.openModal = function(position) {
        showModal();
    };
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', hideModal);
    
    // 点击模态框背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    const expandButtons = document.querySelectorAll('.expand-toggle');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.closest('.expandable-section');
            section.classList.toggle('expanded');
            
            if(section.classList.contains('expanded')) {
                section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // 更新翻译函数
    function updateTranslations() {
        const elements = modal.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getTranslation(key, currentLang);
            if (translation) {
                element.textContent = translation;
            }
        });
    }
}); 