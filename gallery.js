document.addEventListener('DOMContentLoaded', function() {
    // 图片画廊功能
    const galleryThumbs = document.querySelectorAll('.gallery-thumbs img');
    const galleryMain = document.querySelector('.gallery-main img');
    
    if (galleryThumbs.length > 0) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // 获取大图路径（假设缩略图和大图路径有规律）
                const newSrc = this.src.replace('-thumb', '-large');
                galleryMain.src = newSrc;
                
                // 更新缩略图active状态
                galleryThumbs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // 地图工具提示
    const mapAreas = document.querySelectorAll('map area');
    const mapTooltip = document.getElementById('mapTooltip');
    
    if (mapAreas.length > 0 && mapTooltip) {
        mapAreas.forEach(area => {
            area.addEventListener('mouseover', function() {
                const title = this.getAttribute('title');
                const coords = this.getAttribute('coords').split(',');
                mapTooltip.textContent = title;
                mapTooltip.style.left = `${coords[0]}px`;
                mapTooltip.style.top = `${coords[1]}px`;
                mapTooltip.style.opacity = '1';
            });
            
            area.addEventListener('mouseout', function() {
                mapTooltip.style.opacity = '0';
            });
        });
    }
});