// Website Preview Functionality
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有项目链接
    const projectLinks = document.querySelectorAll('section li a');
    
    projectLinks.forEach((link, index) => {
        const listItem = link.parentElement;
        
        // 创建预览容器
        const previewContainer = document.createElement('div');
        previewContainer.className = 'website-preview';
        
        // 创建iframe
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '9px';
        iframe.style.transform = 'scale(1)'; // 移除缩放，让iframe填满
        iframe.style.transformOrigin = 'top left';
        iframe.style.background = 'white';
        
        // 创建预览覆盖层
        const overlay = document.createElement('div');
        overlay.className = 'preview-overlay';
        overlay.textContent = 'LIVE PREVIEW';
        
        // 组装预览容器
        previewContainer.appendChild(iframe);
        previewContainer.appendChild(overlay);
        listItem.appendChild(previewContainer);
        
        // 鼠标悬停事件
        listItem.addEventListener('mouseenter', function() {
            // 延迟加载iframe以提高性能
            setTimeout(() => {
                if (!iframe.src) {
                    iframe.src = link.href;
                }
            }, 200);
        });
        
        // 鼠标离开事件 - 可选：清除iframe以节省资源
        listItem.addEventListener('mouseleave', function() {
            // 可以选择在离开时清除iframe以节省资源
            // setTimeout(() => {
            //     iframe.src = '';
            // }, 1000);
        });
    });
    
    // 添加必要的CSS样式
    const style = document.createElement('style');
    style.textContent = `
        /* 确保section可以显示预览 */
        section {
            overflow: visible !important;
        }
        
        section li {
            overflow: visible !important;
            position: relative;
        }
        
        /* Website Preview Styles - 适中的预览尺寸 */
        .website-preview {
            position: absolute;
            top: -280px; /* 调整位置 */
            left: 50%;
            transform: translateX(-50%);
            width: 480px; /* 减小宽度 */
            height: 300px; /* 减小高度 */
            border: 3px solid var(--color-secondary, rgb(183, 158, 89));
            border-radius: 12px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
            z-index: 1000;
            box-shadow: 0 15px 40px rgba(0,0,0,0.25);
            overflow: hidden;
            background: white;
            pointer-events: none;
        }
        
        .website-preview iframe {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 9px;
            background: white;
        }
        
        .website-preview::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, transparent 85%, rgba(255,255,255,0.9) 100%);
            pointer-events: none;
        }
        
        .website-preview .preview-overlay {
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(183, 158, 89, 0.9);
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.5px;
            z-index: 10;
        }
        
        section li:hover .website-preview {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(-10px) scale(1.02);
        }
        
        /* 响应式调整 */
        @media (max-width: 1100px) {
            .website-preview {
                width: 400px; /* 中等屏幕 */
                height: 250px;
                top: -260px;
            }
        }
        
        @media (max-width: 750px) {
            .website-preview {
                width: 320px; /* 移动端 */
                height: 200px;
                top: -220px;
            }
        }
    `;
    
    document.head.appendChild(style);
});

// 可选：处理iframe加载错误的情况
document.addEventListener('DOMContentLoaded', function() {
    // 监听所有iframe的加载错误
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IFRAME') {
            const iframe = e.target;
            const container = iframe.closest('.website-preview');
            if (container) {
                // 如果iframe加载失败，显示备用内容
                iframe.style.display = 'none';
                
                const fallback = document.createElement('div');
                fallback.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
                    color: #666;
                    font-size: 14px;
                    text-align: center;
                    padding: 20px;
                    box-sizing: border-box;
                `;
                fallback.innerHTML = `
                    <div>
                        <div style="font-size: 24px; margin-bottom: 8px;">🌐</div>
                        <div>Preview not available</div>
                        <div style="font-size: 12px; margin-top: 4px; opacity: 0.7;">Click to visit site</div>
                    </div>
                `;
                
                container.insertBefore(fallback, iframe);
            }
        }
    }, true);
});