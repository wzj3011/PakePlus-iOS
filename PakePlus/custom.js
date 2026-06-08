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


(function() {
    // 要隐藏的元素选择器（按需修改）
    const selectors = ['.footer', '.fixedGroup', '.mobile-download-popup'];

    // 方法1：直接隐藏/移除（作为主方法）
    function hideElements() {
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                // 使用 style 隐藏，防止被恢复
                el.style.setProperty('display', 'none', 'important');
            });
        });
    }

    // 方法2：注入强优先级 CSS（作为备用，确保即使 JS 晚执行也能覆盖）
    function injectCSS() {
        const style = document.createElement('style');
        style.textContent = selectors.map(sel => `${sel} { display: none !important; }`).join(' ');
        document.head.appendChild(style);
    }

    // 等待 DOM 就绪后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            injectCSS();      // CSS 先注入，保证页面显示前就生效
            hideElements();
        });
    } else {
        injectCSS();
        hideElements();
    }

    // 监听动态新增的元素（因为有些网站会动态生成这些模块）
    const observer = new MutationObserver(mutations => {
        let needHide = false;
        for (const mut of mutations) {
            if (mut.addedNodes.length) {
                needHide = true;
                break;
            }
        }
        if (needHide) hideElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();