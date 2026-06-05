window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// 修复被污染的 console（防止报错）
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
        // ========== 1. 处理链接跳转（修复 _blank） ==========
        document.addEventListener('click',function(e){
            var a=e.target.closest('a');
            var base=!!document.querySelector('head base[target="_blank"]');
            if(a && a.href && (a.target==='_blank' || base)){
                e.preventDefault();
                location.href=a.href;
            }
        });

        // ========== 2. 隐藏指定元素（新增 item right 相关） ==========
        var sel=[
            '.article-copyright','#article-copyright',
            '.article-shares','#article-shares',
            '.single-related','#single-related',
            '.desc','#desc',
            '.home-cathumbs','#home-cathumbs',
            '.modown-ad','#modown-ad',
            '.article-nav','#article-nav',
            // 新增 item right 的几种可能
            '.item.right',   // class="item right"
            '.item-right',   // class="item-right"
            '#item-right'    // id="item-right"
        ];
        function hide(){
            for(var i=0;i<sel.length;i++){
                var els=document.querySelectorAll(sel[i]);
                for(var j=0;j<els.length;j++) els[j].style.display='none';
            }
        }
        hide();
        setInterval(hide,500);

        // ========== 3. 右下角功能按钮（40px，右边距1px） ==========
        if(document.getElementById('pakeplus-float-btn')) return;
        var btn=document.createElement('div');
        btn.id='pakeplus-float-btn';
        btn.innerHTML='⚙️';
        btn.setAttribute('style','position:fixed !important; bottom:52px !important; right:1px !important; width:40px !important; height:40px !important; background:#000000dd !important; backdrop-filter:blur(8px) !important; color:white !important; font-size:24px !important; text-align:center !important; line-height:40px !important; border-radius:50% !important; cursor:pointer !important; z-index:999999 !important; box-shadow:0 4px 12px rgba(0,0,0,0.3) !important; transition:0.2s !important; user-select:none !important;');
        btn.onmouseenter=function(){ btn.style.background='#000000'; };
        btn.onmouseleave=function(){ btn.style.background='#000000dd'; };

        var menu=document.createElement('div');
        menu.id='pakeplus-menu';
        menu.setAttribute('style','position:fixed !important; bottom:90px !important; right:10px !important; background:#2c2c2eef !important; backdrop-filter:blur(16px) !important; border-radius:16px !important; padding:8px 0 !important; min-width:160px !important; z-index:999998 !important; box-shadow:0 8px 20px rgba(0,0,0,0.3) !important; border:1px solid rgba(255,255,255,0.2) !important; opacity:0 !important; transform:scale(0.9) !important; transition:0.2s !important; pointer-events:none !important;');

        // ----- 功能函数 -----
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

        function goTo(path){
            location.href = location.origin + path;
        }

        function goHome(){
            location.href = location.origin;
        }
        function goOnlineGallery(){
            location.href = 'https://www.tusheol.com';
        }
        // 菜单项顺序
        var items = [
            { label: '📋 提交工单', action: function(){ goTo('/user?action=ticket'); } }, 
            { label: '💰 在线充值', action: function(){ goTo('/user?action=charge'); } },
            { label: '⭐ 我的收藏', action: function(){ goTo('/user?action=collect'); } },
            { label: '📲 APP下载', action: function(){ goTo('/app'); } },
            { label: '💬 网站留言', action: function(){ goTo('/liuyan'); } },
            { label: '🗑️ 清除缓存', action: clearCache },
            { label: '🖼️ 在线看图', action: goOnlineGallery }, 
            { label: '🏠 返回主页', action: function(){ location.href = 'https://www.tududu.com'; } },
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