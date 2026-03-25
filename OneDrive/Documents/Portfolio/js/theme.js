/* ═══════════════════════════════════════════
   THEME.JS — Light/Dark Theme Switching
═══════════════════════════════════════════ */

(function () {
    'use strict';

    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const storageKey = 'portfolio-theme';

    // ─── Initialize Theme ───
    const savedTheme = localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;

    applyTheme(initialTheme);

    // ─── Apply Theme Logic ───
    function applyTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem(storageKey, theme);
        updateToggleButton(theme);
    }

    // ─── Toggle Button UI ───
    function updateToggleButton(theme) {
        if (!themeToggle) return;
        
        // You can swap icons or update text here
        const icon = themeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'dark' ? '☼' : '☾';
        }
    }

    // ─── Event Listener ───
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }

    // Listen for system changes if no preference is set
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(storageKey)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

})();
