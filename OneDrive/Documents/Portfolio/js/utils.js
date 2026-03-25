/* ═══════════════════════════════════════════
   UTILS.JS — Shared functions & Dynamic Year
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Set Footer Year ───
    function setDynamicYear() {
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => el.textContent = currentYear);
    }

    // ─── Document Ready ───
    document.addEventListener('DOMContentLoaded', () => {
        setDynamicYear();
    });

})();
