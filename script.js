(function() {
    'use strict';

    var nav = document.getElementById('nav');
    var btt = document.getElementById('btt');
    var burger = document.getElementById('navBurger');
    var navLinks = document.getElementById('navLinks');

    function onScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        if (nav) nav.classList.toggle('scrolled', y > 50);
        if (btt) btt.classList.toggle('visible', y > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (btt) {
        btt.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (burger && navLinks) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', function() {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
            });
        });
    }

    document.querySelectorAll('.faq-q').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var item = this.parentElement;
            var open = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
            if (!open) item.classList.add('open');
        });
    });

    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(function(el) { obs.observe(el); });
    } else {
        reveals.forEach(function(el) { el.classList.add('visible'); });
    }

    fetch('https://api.github.com/repos/dongala899/DNRVyaparWeb/releases/latest')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            var asset = data.assets && data.assets.find(function(a) { return a.name.endsWith('.exe'); });
            if (asset) {
                var btn = document.getElementById('download-btn');
                if (btn) { btn.href = asset.browser_download_url; btn.download = ''; }
            }
            var ver = data.tag_name || '';
            if (ver) {
                var info = document.getElementById('dl-info');
                if (info) {
                    var d = new Date(data.published_at);
                    info.textContent = ver + ' \u2022 Updated ' + d.toLocaleString('en-US', { month: 'long' }) + ' ' + d.getFullYear();
                }
                var faqVer = document.getElementById('faq-version');
                if (faqVer) {
                    faqVer.textContent = ver + ' is the current release. We recommend always updating to the latest version for new features and bug fixes.';
                }
            }
        })
        .catch(function() {});
})();
