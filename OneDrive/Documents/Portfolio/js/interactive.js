/* ═══════════════════════════════════════════
   INTERACTIVE.JS — Premium Interactivity
   Magnetic buttons, 3D tilt, and luxury cursor
═══════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Interactive Card Stack ───
    const stack = document.querySelector('.hero__card-stack');
    const cards = document.querySelectorAll('.hero__card');
    let currentIndex = 0;

    if (stack && cards.length) {
        stack.addEventListener('click', () => {
            const frontCard = cards[currentIndex % cards.length];
            
            // 1. Slide out animation
            frontCard.classList.add('is-swapping');
            
            // 2. Move to back after animation
            setTimeout(() => {
                frontCard.classList.remove('is-swapping');
                currentIndex++;
                updateStackPositions();
            }, 500); // match CSS duration
        });
    }

    function updateStackPositions() {
        cards.forEach((card, index) => {
            const position = (index - currentIndex + cards.length) % cards.length;
            card.setAttribute('data-position', position);
            
            // Clear inline styles if any from 3D tilt
            card.style.transform = '';
            card.style.zIndex = cards.length - position;
        });
    }

    // Initialize positions
    updateStackPositions();

    // ─── 3D Tilt for Project Cards (Main Grid) ───
    const gridCards = document.querySelectorAll('.card--tilt');
    
    gridCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
        });
    });

    // ─── Global Reveal Observer (Advanced) ───
    // This adds a "staggered" reveal to child elements
    const observers = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                // Optional: trigger child animations here
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-group').forEach(group => {
        observers.observe(group);
    });

})();
