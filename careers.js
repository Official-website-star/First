document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('applyModal');
    const closeBtn = modal.querySelector('.modal-close');
    const applyButtons = document.querySelectorAll('.apply-btn');
    
    // 显示模态框
    function showModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    // 隐藏模态框
    function hideModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // 为所有应用按钮添加点击事件
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showModal();
        });
    });
    
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
}); 