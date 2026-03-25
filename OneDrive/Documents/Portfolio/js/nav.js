/* ═══════════════════════════════════════════
   NAV.JS — Sticky nav + mobile menu
═══════════════════════════════════════════ */

(function () {
    'use strict';

    const nav = document.getElementById('mainNav');
    const hamburger = document.getElementById('hamburger');
    const mobile = document.getElementById('mobileMenu');

    // ─── Scroll — add background on scroll ───
    const SCROLL_THRESHOLD = 10;

    function onScroll() {
        const y = window.scrollY;
        if (y > SCROLL_THRESHOLD) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load

    // ─── Hamburger toggle ───
    if (hamburger && mobile) {
        hamburger.addEventListener('click', function () {
            const isOpen = hamburger.classList.toggle('active');
            mobile.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            mobile.setAttribute('aria-hidden', !isOpen);
        });

        // Close mobile menu when a link is clicked
        mobile.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                mobile.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                mobile.setAttribute('aria-hidden', 'true');
            });
        });
    }
})();
