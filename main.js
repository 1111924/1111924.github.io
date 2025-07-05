// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    // 添加加载完成类，触发动画
    document.body.classList.add('loaded');
    
    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoad = function() {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top < window.innerHeight && !img.src) {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            }
        });
    };
    
    // 初始加载可视区域图片
    lazyLoad();
    
    // 滚动时加载图片
    window.addEventListener('scroll', lazyLoad);
    
    // 选项卡功能
    const tabs = document.querySelectorAll('.tab-nav li');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // 移除所有active类
                tabs.forEach(t => t.classList.remove('active'));
                // 添加当前active类
                this.classList.add('active');
                
                // 隐藏所有内容
                const panes = document.querySelectorAll('.tab-pane');
                panes.forEach(pane => pane.classList.remove('active'));
                
                // 显示对应内容
                const index = Array.from(tabs).indexOf(this);
                panes[index].classList.add('active');
            });
        });
    }
    
    // 产品规格选择
    const specOptions = document.querySelectorAll('.spec-option');
    if (specOptions.length > 0) {
        specOptions.forEach(option => {
            option.addEventListener('click', function() {
                specOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // 数量增减按钮
    const quantityInput = document.querySelector('.quantity-control input');
    if (quantityInput) {
        document.querySelector('.quantity-control .decrease').addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        document.querySelector('.quantity-control .increase').addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });
    }
    
    // 缩略图切换
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (thumbnails.length > 0) {
        const mainImage = document.querySelector('.main-image img');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // 移除所有active类
                thumbnails.forEach(t => t.classList.remove('active'));
                // 添加当前active类
                this.classList.add('active');
                
                // 切换主图
                const newSrc = this.querySelector('img').src.replace('-thumb', '-large');
                mainImage.src = newSrc;
                
                // 如果有zoom功能，更新zoom图片
                if (mainImage.hasAttribute('data-zoom-image')) {
                    mainImage.setAttribute('data-zoom-image', newSrc.replace('-large', '-zoom'));
                }
            });
        });
    }
    
    // 表单提交
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // 这里可以添加表单验证和AJAX提交逻辑
            alert('表单已提交，感谢您的反馈！');
            this.reset();
        });
    });
    
    // 回到顶部按钮
    const backToTop = document.createElement('div');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
});

// 页面滚动动画
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
});
document.querySelectorAll('.navbar li').forEach(item => {
    item.addEventListener('click', function() {
        // 移除所有active类
        document.querySelectorAll('.navbar li').forEach(li => {
            li.classList.remove('active');
        });
        // 为当前点击项添加active类
        this.classList.add('active');
    });
});
document.addEventListener('click', function(e) {
    createBlueberry(e.clientX, e.clientY);
});

// 小蓝莓点击特效
function createBlueberry(x, y) {
    const berry = document.createElement('div');
    berry.className = 'blueberry-effect';
    berry.style.left = `${x}px`;
    berry.style.top = `${y}px`;
    
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    berry.appendChild(leaf);
    
    document.body.appendChild(berry);
    setTimeout(() => berry.remove(), 1000);
}

// 智能点击处理（避开表单元素）
function handleClick(e) {
    // 不干扰表单元素操作
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
    
    // 导航栏特殊处理：在点击项中心生成
    if (e.target.closest('.navbar li')) {
        const rect = e.target.getBoundingClientRect();
        createBlueberry(rect.left + rect.width/2, rect.top + rect.height/2);
    } else {
        createBlueberry(e.clientX, e.clientY);
    }
}

// 绑定事件（桌面+移动端）
document.addEventListener('click', handleClick);
document.addEventListener('touchend', (e) => handleClick(e.changedTouches[0]));

 document.addEventListener('DOMContentLoaded', function() {
            const container = document.querySelector('.image-container');
            const mainImg = document.querySelector('.main-image');
            const satellites = document.querySelectorAll('.satellite');
            
            // 计算小图位置（圆形排列）
            const radius = 150; // 半径
            const center = { x: 150, y: 150 }; // 中心点
            const count = satellites.length;
            
            satellites.forEach((satellite, index) => {
                // 计算每个小图的位置
                const angle = (index * (2 * Math.PI / count)) - Math.PI/2;
                const x = center.x + radius * Math.cos(angle) - 30;
                const y = center.y + radius * Math.sin(angle) - 30;
                
                // 设置初始位置
                satellite.style.transform = `scale(0) translate(${x}px, ${y}px)`;
                satellite.style.transformOrigin = 'center center';
                
                // 鼠标悬停主图时显示小图
                container.addEventListener('mouseenter', () => {
                    satellite.style.transform = `scale(1) translate(${x}px, ${y}px)`;
                });
                
                // 鼠标离开主图时隐藏小图
                container.addEventListener('mouseleave', () => {
                    satellite.style.transform = `scale(0) translate(${x}px, ${y}px)`;
                    satellite.classList.remove('active');
                });
                
                // 点击小图放大/恢复
                satellite.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    if (satellite.classList.contains('active')) {
                        satellite.classList.remove('active');
                        satellite.style.transform = `scale(1) translate(${x}px, ${y}px)`;
                    } else {
                        // 先关闭其他激活的小图
                        satellites.forEach(s => s.classList.remove('active'));
                        
                        satellite.classList.add('active');
                        satellite.style.transform = `scale(1.5) translate(${x}px, ${y}px)`;
                    }
                });
            });
            
            // 点击主图关闭所有激活的小图
            mainImg.addEventListener('click', () => {
                satellites.forEach(satellite => {
                    satellite.classList.remove('active');
                });
            });
        });