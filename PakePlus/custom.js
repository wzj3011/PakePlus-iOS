window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })


// ==================== 你添加的隐藏脚本 ====================
function hideElements() {
    // 注意：这里使用了更严谨的选择器，来区分class和id
    const selectors = [
        '.article-copyright', '#article-copyright',   // 版权信息
        '.article-shares', '#article-shares',         // 分享组件
        '.single-related', '#single-related',         // 相关推荐
        '.desc', '#desc',                             // 描述区域
        '.home-cathumbs', '#home-cathumbs',           // 首页分类缩略图
        '.modown-ad', '#modown-ad'                    // 新增：广告位
    ];
    
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.display = 'none';
        });
    });
}

// 页面加载后执行一次隐藏
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideElements);
} else {
    hideElements();
}

// 监听页面变化，确保通过AJAX新加载的内容也被隐藏
const observer = new MutationObserver(() => {
    hideElements();
});
observer.observe(document.body, { childList: true, subtree: true });
