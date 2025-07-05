document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.awards-slider');
    
    if (slider) {
        const slides = document.querySelectorAll('.award-slide');
        const prevBtn = document.querySelector('.slider-controls .prev');
        const nextBtn = document.querySelector('.slider-controls .next');
        let currentIndex = 0;
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }
        
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // 自动轮播
        let slideInterval = setInterval(nextSlide, 5000);
        
        // 鼠标悬停暂停
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
});