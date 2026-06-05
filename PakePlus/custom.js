window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 修复被污染的 console
if (typeof console !== 'object' || typeof console.log !== 'function') {
    window.console = window.console || {};
    console.log = function(){};
    console.warn = function(){};
    console.error = function(){};
}

(function(){
    if(window.__pakeplus_done) return;
    window.__pakeplus_done=true;

    function waitBody(cb){
        if(document.body){ cb(); return; }
        var t=setInterval(function(){
            if(document.body){ clearInterval(t); cb(); }
        },100);
    }

    waitBody(function(){
        // 1. 链接跳转修复
        document.addEventListener('click',function(e){
            var a=e.target.closest('a');
            var base=!!document.querySelector('head base[target="_blank"]');
            if(a && a.href && (a.target==='_blank' || base)){
                e.preventDefault();
                location.href=a.href;
            }
        });

        // 2. 强制隐藏指定元素
        var hideSelectors = [
            '.article-copyright', '#article-copyright',
            '.article-shares', '#article-shares',
            '.single-related', '#single-related',
            '.desc', '#desc',
            '.home-cathumbs', '#home-cathumbs',
            '.modown-ad', '#modown-ad',
            '.article-nav', '#article-nav',
            '.item.right', '.item-right', '#item-right'
        ];
        var style = document.createElement('style');
        style.textContent = hideSelectors.join(',') + ' { display: none !important; }';
        document.head.appendChild(style);
        function hideElements() {
            for (var i = 0; i < hideSelectors.length; i++) {
                var els = document.querySelectorAll(hideSelectors[i]);
                for (var j = 0; j < els.length; j++) {
                    els[j].style.setProperty('display', 'none', 'important');
                }
            }
        }
        hideElements();
        setInterval(hideElements, 500);

        // 3. 移除特定元素并处理 <br>
        function removeAndFixBr() {
            var ids = ['mocat-6937', 'mocat-3', 'mocat-5649'];
            for (var i = 0; i < ids.length; i++) {
                var el = document.getElementById(ids[i]);
                if (el) el.remove();
            }
            var contents = document.querySelector('.contents');
            if (contents) {
                var brs = contents.querySelectorAll('br');
                var groups = [];
                var curr = [];
                for (var i = 0; i < brs.length; i++) {
                    var prev = brs[i].previousSibling;
                    if (prev && prev.nodeType === 1 && prev.tagName === 'BR') {
                        curr.push(brs[i]);
                    } else {
                        if (curr.length) groups.push(curr);
                        curr = [brs[i]];
                    }
                }
                if (curr.length) groups.push(curr);
                for (var g = 0; g < groups.length; g++) {
                    if (groups[g].length > 2) {
                        for (var k = 2; k < groups[g].length; k++) {
                            groups[g][k].remove();
                        }
                    }
                }
            }
        }
        removeAndFixBr();
        setInterval(removeAndFixBr, 1000);

        // 4. 移除 footer 相关元素
        var footerSelectors = [
            '.molis.clearfix', 'footer', '.footer', '#footer',
            '.site-footer', '.page-footer', '.bottom-bar'
        ];
        function removeFooters() {
            for (var i = 0; i < footerSelectors.length; i++) {
                var els = document.querySelectorAll(footerSelectors[i]);
                for (var j = 0; j < els.length; j++) {
                    els[j].remove();
                }
            }
        }
        removeFooters();
        setInterval(removeFooters, 2000);

        // 5. 修复分类页页码和VIP页日志被底部导航遮挡（独立调节）
        function fixBottomOverlap() {
            var bottomNav = document.querySelector('.footer-fixed-nav');
            if (!bottomNav) return;
            var navHeight = bottomNav.offsetHeight;
            if (navHeight === 0) return;

            // ===== 独立调节参数 =====
            // 分类页（.pagination）的额外底部间距和上边距
            var paginationExtraBottom = -15;   // 页码与导航之间的额外间距（px）
            var paginationTopMargin = -15;     // 页码上方的间距（px）

            // VIP页（.vip-logs）的额外底部间距和上边距
            var vipLogsExtraBottom = 10;       // VIP日志与导航之间的额外间距（px）
            var vipLogsTopMargin = 20;         // VIP日志上方的间距（px）
            // =========================

            var pagination = document.querySelector('.pagination');
            if (pagination) {
                pagination.style.marginBottom = (navHeight + paginationExtraBottom) + 'px';
                pagination.style.marginTop = paginationTopMargin + 'px';
            }

            var vipLogs = document.querySelector('.vip-logs');
            if (vipLogs) {
                vipLogs.style.marginBottom = (navHeight + vipLogsExtraBottom) + 'px';
                vipLogs.style.marginTop = vipLogsTopMargin + 'px';
            }
        }
        fixBottomOverlap();
        setInterval(fixBottomOverlap, 500);

        // 6. 基础边距清理
        function cleanMargins() {
            document.body.style.marginBottom = '0';
            document.body.style.paddingBottom = '0';
        }
        cleanMargins();
        setInterval(cleanMargins, 500);

        // ========== 右下角功能菜单 ==========
        if(document.getElementById('pakeplus-float-btn')) return;
        var btn=document.createElement('div');
        btn.id='pakeplus-float-btn';
        btn.innerHTML='⚙️';
        btn.setAttribute('style','position:fixed !important; bottom:30px !important; right:1px !important; width:40px !important; height:40px !important; background:#000000dd !important; backdrop-filter:blur(8px) !important; color:white !important; font-size:24px !important; text-align:center !important; line-height:40px !important; border-radius:50% !important; cursor:pointer !important; z-index:999999 !important; box-shadow:0 4px 12px rgba(0,0,0,0.3) !important; transition:0.2s !important; user-select:none !important;');
        btn.onmouseenter=function(){ btn.style.background='#000000'; };
        btn.onmouseleave=function(){ btn.style.background='#000000dd'; };

        var menu=document.createElement('div');
        menu.id='pakeplus-menu';
        menu.setAttribute('style','position:fixed !important; bottom:90px !important; right:10px !important; background:#2c2c2eef !important; backdrop-filter:blur(16px) !important; border-radius:16px !important; padding:8px 0 !important; min-width:160px !important; z-index:999998 !important; box-shadow:0 8px 20px rgba(0,0,0,0.3) !important; border:1px solid rgba(255,255,255,0.2) !important; opacity:0 !important; transform:scale(0.9) !important; transition:0.2s !important; pointer-events:none !important;');

        function clearCache(){
            try{
                localStorage.clear();
                sessionStorage.clear();
                var cks=document.cookie.split(';');
                for(var i=0;i<cks.length;i++){
                    var name=cks[i].split('=')[0].trim();
                    document.cookie=name+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                }
                alert('✅ 存储缓存已清除');
            }catch(err){ alert('清除失败:'+err.message); }
        }

        function closeApp(){
            if(window.__TAURI__ && window.__TAURI__.window){
                window.__TAURI__.window.getCurrentWindow().close().catch(function(err){ fallbackClose(); });
                return;
            }
            if(window.Android && window.Android.closeApp){ window.Android.closeApp(); return; }
            if(navigator.app && navigator.app.exitApp){ navigator.app.exitApp(); return; }
            fallbackClose();
        }
        function fallbackClose() { alert('请使用系统手势从屏幕底部上滑并停留或从最近任务中划掉应用来关闭。'); }

        function goTo(path){ location.href = location.origin + path; }
        function goHome(){ location.href = 'https://www.pamuku.com'; }
        function goOnlineGallery(){ location.href = 'https://www.tusheol.com'; }

        var items = [
            { label: '📋 提交工单', action: function(){ goTo('/user?action=ticket'); } },
            { label: '💰 在线充值', action: function(){ goTo('/user?action=charge'); } },
            { label: '⭐ 我的收藏', action: function(){ goTo('/user?action=collect'); } },
            { label: '📲 APP下载', action: function(){ goTo('/app'); } },
            { label: '💬 网站留言', action: function(){ goTo('/liuyan'); } },
            { label: '🖼️ 在线看图', action: goOnlineGallery },
            { label: '🗑️ 清除缓存', action: clearCache },
            { label: '🏠 返回主页', action: goHome },

        ];

        for(var i=0;i<items.length;i++){
            var mi=document.createElement('div');
            mi.textContent=items[i].label;
            mi.setAttribute('style','padding:12px 20px !important; color:white !important; font-size:15px !important; cursor:pointer !important; transition:0.2s !important; white-space:nowrap !important;');
            mi.onmouseenter=function(e){ e.target.style.background='rgba(255,255,255,0.2)'; };
            mi.onmouseleave=function(e){ e.target.style.background='transparent'; };
            (function(act){
                mi.onclick=function(e){
                    e.stopPropagation();
                    menu.style.opacity='0';
                    menu.style.transform='scale(0.9)';
                    menu.style.pointerEvents='none';
                    menuOpen=false;
                    act();
                };
            })(items[i].action);
            menu.appendChild(mi);
        }

        document.body.appendChild(btn);
        document.body.appendChild(menu);
        var menuOpen=false;
        btn.onclick=function(e){
            e.stopPropagation();
            if(menuOpen){
                menu.style.opacity='0';
                menu.style.transform='scale(0.9)';
                menu.style.pointerEvents='none';
            }else{
                menu.style.opacity='1';
                menu.style.transform='scale(1)';
                menu.style.pointerEvents='auto';
            }
            menuOpen=!menuOpen;
        };
        document.addEventListener('click',function(e){
            if(menuOpen && !btn.contains(e.target) && !menu.contains(e.target)){
                menu.style.opacity='0';
                menu.style.transform='scale(0.9)';
                menu.style.pointerEvents='none';
                menuOpen=false;
            }
        });
    });
})();