/* ═══════════════════════════════════════════
   CURSOR.JS — Custom cursor effect
═══════════════════════════════════════════ */

(function () {
  'use strict';

  // Only run on devices with hover (desktop)
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (!cursor || !follower) return;

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  // Track mouse position
  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower with requestAnimationFrame
  function moveFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(moveFollower);
  }
  moveFollower();

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .live-link-pill, .cs-hero__back');

  interactiveElements.forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull: Move the element slightly
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      
      // Magnetic cursor: Lock follower to element center
      followerX = rect.left + rect.width / 2;
      followerY = rect.top + rect.height / 2;
      
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor--magnetic');
    });

    el.addEventListener('mouseleave', function () {
      el.style.transform = `translate(0, 0)`;
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor--magnetic');
    });
  });

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', function () {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    cursor.style.opacity   = '1';
    follower.style.opacity = '1';
  });
})();
