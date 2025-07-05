document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-controls .prev');
    const nextBtn = document.querySelector('.carousel-controls .next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    let slideInterval;
    const slideCount = slides.length;
    
    // 创建指示器
    function createIndicators() {
        for (let i = 0; i < slideCount; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // 转到特定幻灯片
    function goToSlide(index) {
        // 确保索引在有效范围内
        if (index < 0) {
            index = slideCount - 1;
        } else if (index >= slideCount) {
            index = 0;
        }
        
        // 更新当前索引
        currentIndex = index;
        
        // 移动轮播图
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 更新活动幻灯片类
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });
        
        // 更新指示器
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
        
        // 重置自动轮播计时器
        resetInterval();
    }
    
    // 下一张幻灯片
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // 重置自动轮播计时器
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // 初始化轮播图
    function initCarousel() {
        createIndicators();
        
        // 设置初始位置
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 添加按钮事件监听器
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // 开始自动轮播
        resetInterval();
        
        // 鼠标悬停时暂停轮播
        carousel.parentElement.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // 鼠标离开时恢复轮播
        carousel.parentElement.addEventListener('mouseleave', resetInterval);
        
        // 触摸事件支持
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.parentElement.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        });
        
        carousel.parentElement.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetInterval();
        });
        
        function handleSwipe() {
            const threshold = 50; // 最小滑动距离
            
            if (touchStartX - touchEndX > threshold) {
                // 向左滑动，下一张
                nextSlide();
            } else if (touchEndX - touchStartX > threshold) {
                // 向右滑动，上一张
                prevSlide();
            }
        }
    }
    
    // 如果存在轮播图元素，则初始化
    if (carousel && slides.length > 0) {
        initCarousel();
    }
});