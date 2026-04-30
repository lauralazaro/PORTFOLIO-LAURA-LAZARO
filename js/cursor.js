document.addEventListener("DOMContentLoaded", () => {
  const ball = document.querySelector(".cursor-ball");
  if (!ball || !window.gsap) return;

  // Detectar dispositivos táctiles (móvil/tablet)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) {
    // Si es táctil, ocultar el cursor
    ball.style.display = "none";
    return; // Salimos del script, no añadimos movimiento
  }

  const moveX = gsap.quickTo(ball, "x", {
    duration: 0.3,
    ease: "power3.out"
  });
  const moveY = gsap.quickTo(ball, "y", {
    duration: 0.3,
    ease: "power3.out"
  });

  window.addEventListener("mousemove", (e) => {
    moveX(e.clientX);
    moveY(e.clientY);
  });
});