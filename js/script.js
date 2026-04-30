// MENU BLEND
(function () {
  const $navbar = $(".navbar-blur");
  const header = $("header").first()[0];

  if (!$navbar.length || !header) return;

  function updateNavbarBlend() {
    const headerRect = header.getBoundingClientRect();
    const navbarRect = $navbar[0].getBoundingClientRect();

    const isOnHeader =
      navbarRect.bottom > headerRect.top &&
      navbarRect.top < headerRect.bottom;

    $navbar.toggleClass("navbar-on-header", isOnHeader);
  }

  let ticking = false;

  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      updateNavbarBlend();
      ticking = false;
    });
  }

  updateNavbarBlend();
  $(window).on("scroll resize", onScrollOrResize);
})();



(function () {
  const $offcanvas = $("#offcanvasNavbar");
  if (!$offcanvas.length) return;

  $offcanvas.on("show.bs.offcanvas", function () {
    $("body").addClass("offcanvas-open");
    $(window).trigger("scroll");
  });

  $offcanvas.on("hidden.bs.offcanvas", function () {
    $("body").removeClass("offcanvas-open");
    $(window).trigger("scroll");
  });
})();


// PELOTEO HOME
// footer
$(function () {

  const $footer = $("footer");

  function setHeroHeight() {
    const footerHeight = $footer.outerHeight();
    document.documentElement.style.setProperty(
      "--footer-height",
      `${footerHeight}px`
    );
  }

  setHeroHeight();
  $(window).on("resize", setHeroHeight);



  // animacion peloteo palabra
  const $loop = $("#heroLoop");
  if (!$loop.length) return;

  const loopWidth = $loop.outerWidth();

  gsap.set($loop, { x: 0 });

  gsap.to($loop, {
    x: -loopWidth / 2,
    duration: 60,
    ease: "none",
    repeat: -1
  });

});

const letters = document.querySelectorAll('#heroLoop span span');

letters.forEach(letter => {
  let vx = 0, vy = 0;
  let x = 0, y = 0;
  let rafId = null;
  let active = false;
  let returning = false;
  let lastTime = null;

  const origin = { x: 0, y: 0 };

  requestAnimationFrame(() => {
    origin.x = gsap.getProperty(letter, "x");
    origin.y = gsap.getProperty(letter, "y");
    x = origin.x;
    y = origin.y;
  });

  const bounds = {
    x: 80,
    yTop: -160
  };

  const letters = document.querySelectorAll('#heroLoop span span');

  letters.forEach(letter => {
    let vx = 0, vy = 0;
    let x = 0, y = 0;
    let rotation = 0;
    let scale = 1;
    let rafId = null;
    let active = false;
    let returning = false;
    let lastTime = null;

    const origin = { x: 0, y: 0 };

    requestAnimationFrame(() => {
      origin.x = gsap.getProperty(letter, "x");
      origin.y = gsap.getProperty(letter, "y");
      x = origin.x;
      y = origin.y;
    });

    const bounds = {
      x: 80,
      yTop: -160
    };

    function startPhysics() {
      if (active && !returning) return;

      active = true;
      returning = false;
      lastTime = null;

      vx = gsap.utils.random(-300, 300);
      vy = gsap.utils.random(-900, -600);

      if (!rafId) rafId = requestAnimationFrame(loop);
    }

    function loop(time) {
      if (!active) return;

      if (!lastTime) lastTime = time;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!returning) {
        vy += 2000 * dt;

        x += vx * dt;
        y += vy * dt;

        if (x > origin.x + bounds.x || x < origin.x - bounds.x) {
          vx *= -0.85;
          x = gsap.utils.clamp(origin.x - bounds.x, origin.x + bounds.x, x);
        }

        if (y > origin.y) {
          y = origin.y;
          vy *= -0.75;
          vx *= 0.96;
          if (Math.abs(vy) < 200) vy = gsap.utils.random(-700, -500);
        }

        if (y < origin.y + bounds.yTop) {
          y = origin.y + bounds.yTop;
          vy *= -0.8;
        }
      } else {
        vx += (origin.x - x) * 10 * dt;
        vy += (origin.y - y) * 10 * dt;
        vx *= 0.88;
        vy *= 0.88;

        x += vx * dt;
        y += vy * dt;

        if (
          Math.abs(x - origin.x) < 0.3 &&
          Math.abs(y - origin.y) < 0.3 &&
          Math.abs(vx) < 8 &&
          Math.abs(vy) < 8
        ) {
          active = false;
          cancelAnimationFrame(rafId);
          rafId = null;
          gsap.set(letter, { x: origin.x, y: origin.y, rotate: 0, scale: 1 });
          return;
        }
      }

      const speed = Math.sqrt(vx * vx + vy * vy);
      rotation += vx * 0.002;
      rotation *= returning ? 0.85 : 0.92;

      const targetScale = gsap.utils.clamp(0.95, 1.15, 1 + speed / 4000);
      scale += (targetScale - scale) * (returning ? 0.15 : 0.25);

      gsap.set(letter, { x, y, rotate: rotation, scale });

      rafId = requestAnimationFrame(loop);
    }

    function stopPhysics() {
      returning = true;
    }

    letter.addEventListener("mouseenter", startPhysics);
    letter.addEventListener("mouseleave", stopPhysics);
  });


  function loop(time) {
    if (!active) return;

    if (!lastTime) lastTime = time;
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    if (!returning) {
      vy += 2000 * dt;

      x += vx * dt;
      y += vy * dt;

      if (x > origin.x + bounds.x) {
        x = origin.x + bounds.x;
        vx *= -0.85;
      } else if (x < origin.x - bounds.x) {
        x = origin.x - bounds.x;
        vx *= -0.85;
      }

      if (y > origin.y) {
        y = origin.y;
        vy *= -0.75;
        vx *= 0.96;

        if (Math.abs(vy) < 200) {
          vy = gsap.utils.random(-700, -500);
        }
      }

      if (y < origin.y + bounds.yTop) {
        y = origin.y + bounds.yTop;
        vy *= -0.8;
      }
    }

    else {
      vx += (origin.x - x) * 10 * dt;
      vy += (origin.y - y) * 10 * dt;
      vx *= 0.88;
      vy *= 0.88;

      x += vx * dt;
      y += vy * dt;

      if (
        Math.abs(x - origin.x) < 0.3 &&
        Math.abs(y - origin.y) < 0.3 &&
        Math.abs(vx) < 8 &&
        Math.abs(vy) < 8
      ) {
        active = false;
        cancelAnimationFrame(rafId);
        rafId = null;
        gsap.set(letter, { x: origin.x, y: origin.y });
        return;
      }
    }

    gsap.set(letter, { x, y });
    rafId = requestAnimationFrame(loop);
  }

  function stopPhysics() {
    returning = true;
  }

  letter.addEventListener("mouseenter", startPhysics);
  letter.addEventListener("mouseleave", stopPhysics);
});







// WORK
$(function () {
  const $cards = $(".archive-card");

  $cards.on("mouseenter", function () {
    $cards.removeClass("is-active");
    $(this).addClass("is-active");
  });

  $cards.on("mouseleave", function () {
    $(this).removeClass("is-active");
  });
});

$(".archive-card").on("click", function () {
  window.location.href = $(this).data("link");
});




// PROJECT
$(function () {

  const preview = document.querySelector(".project-preview");
  const img = preview.querySelector("img");

  const xTo = gsap.quickTo(preview, "x", { duration: 0.35, ease: "power3" });
  const yTo = gsap.quickTo(preview, "y", { duration: 0.35, ease: "power3" });

  $(".project-menu li").on("mouseenter", function () {
    img.src = $(this).data("img");
    gsap.to(preview, { opacity: 1, duration: 0.2 });
  });

  $(".project-menu li").on("mouseleave", function () {
    gsap.to(preview, { opacity: 0, duration: 0.2 });
  });

  $(window).on("mousemove", e => {
    xTo(e.clientX + 20);
    yTo(e.clientY + 20);
  });

});

$(function () {
  const params = new URLSearchParams(window.location.search);
  const project = params.get("project");

  if (!project) return;

  $(".project-content").load(`projects/${project}.html`);
});



$(document).ready(function () {

  const isMobile = window.innerWidth <= 767;

  $(document).on("click", "[data-target], [data-project]", function () {
    const target =
      $(this).data("target") ||
      $(this).data("project");

    if (!target) return;


    if (isMobile) {
      $("body").addClass("project-open");

      $(".project-mobile-menu").hide();
      $(".project-content, .project-mobile-content")
        .empty()
        .load(target, function () {
          $(this).scrollTop(0);
        });

    } else {
      $(".project-content")
        .stop(true)
        .fadeOut(200, function () {
          $(this).load(target, function () {
            $(this).fadeIn(200);
          });
        });
    }
  });

  $(document).on("click", ".project-back", function () {
    $("body").removeClass("project-open");
    $(".project-content").empty();
  });


});


// Cambio del grid 

document.addEventListener("DOMContentLoaded", () => {
  const btnExp = document.querySelector(".btn-exp");
  const btnGrid = document.querySelector(".btn-view");
  const viewExp = document.getElementById("EXPERIENCE_VIEW");
  const viewGrid = document.getElementById("GRID_VIEW");

  if (!btnExp || !btnGrid || !viewExp || !viewGrid) return;

  function setView(view, setActive = true) {
    const showExperience = view === "experience";

    // Oculta / muestra sin romper el display original (bootstrap row etc.)
    viewExp.hidden = !showExperience;
    viewGrid.hidden = showExperience;

    // Estados de botones
    if (!setActive) {
      btnExp.classList.remove("active");
      btnGrid.classList.remove("active");
      return;
    }

    btnExp.classList.toggle("active", showExperience);
    btnGrid.classList.toggle("active", !showExperience);
  }

  // Estado inicial: se ve EXPERIENCE_VIEW y botones "normal" (sin active)
  setView("experience");

  btnExp.addEventListener("click", (e) => {
    e.preventDefault();
    setView("experience");
  });

  btnGrid.addEventListener("click", (e) => {
    e.preventDefault();
    setView("grid");
  });
});

// Imagenes arrastradas

document.addEventListener("DOMContentLoaded", () => {
  const stage = document.querySelector("#EXPERIENCE_VIEW .stage");
  if (!stage) return;

  // 1) Coge TODAS las imágenes draggables
  const originals = Array.from(stage.querySelectorAll("img.draggable"));

  // 2) Clónalas TODAS para eliminar listeners que vengan de script.js
  const draggables = originals.map((oldImg) => {
    const img = oldImg.cloneNode(true);
    oldImg.replaceWith(img);
    img.draggable = false; // por si acaso
    // Asegura posicionamiento dentro de .stage (relative)
    img.style.position = "absolute";
    return img;
  });

  // Estado global: una sola imagen activa a la vez
  let activeImg = null;
  let offsetX = 0;
  let offsetY = 0;
  let z = 1;

  const startDrag = (e) => {
    activeImg = e.currentTarget;
    activeImg.style.zIndex = String(++z);

    const rect = activeImg.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    activeImg.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const moveDrag = (e) => {
    if (!activeImg) return;

    const stageRect = stage.getBoundingClientRect();

    let left = (e.clientX - stageRect.left) - offsetX;
    let top = (e.clientY - stageRect.top) - offsetY;

    // Limitar dentro de la stage
    const maxLeft = stage.clientWidth - activeImg.offsetWidth;
    const maxTop = stage.clientHeight - activeImg.offsetHeight;

    left = Math.max(0, Math.min(left, Math.max(0, maxLeft)));
    top = Math.max(0, Math.min(top, Math.max(0, maxTop)));

    activeImg.style.left = `${left}px`;
    activeImg.style.top = `${top}px`;

    e.preventDefault();
  };

  const stopDrag = () => {
    activeImg = null;
  };

  // listeners para todas
  draggables.forEach((img) => {
    img.addEventListener("pointerdown", startDrag);
    img.addEventListener("pointermove", moveDrag);
    img.addEventListener("pointerup", stopDrag);
    img.addEventListener("pointercancel", stopDrag);
    img.addEventListener("lostpointercapture", stopDrag);
  });

  // Bloquea el drag nativo del navegador
  stage.addEventListener("dragstart", (e) => e.preventDefault());
});



// --- POSICIÓN ALEATORIA AL CARGAR ---
document.addEventListener("DOMContentLoaded", () => {
  const stage = document.querySelector("#EXPERIENCE_VIEW .stage");
  if (!stage) return;

  // Coge todas las imágenes draggables
  const originals = Array.from(stage.querySelectorAll("img.draggable"));
  if (originals.length === 0) return;

  // Clónalas para "borrar" listeners del script.js global
  const draggables = originals.map((oldImg) => {
    const img = oldImg.cloneNode(true);
    oldImg.replaceWith(img);

    img.draggable = false;
    img.style.position = "absolute"; // por si acaso
    return img;
  });

  // --- DRAG (una activa a la vez) ---
  let activeImg = null;
  let offsetX = 0, offsetY = 0;
  let z = 1;

  const startDrag = (e) => {
    activeImg = e.currentTarget;
    activeImg.style.zIndex = String(++z);

    const rect = activeImg.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    activeImg.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const moveDrag = (e) => {
    if (!activeImg) return;

    const stageRect = stage.getBoundingClientRect();
    let left = (e.clientX - stageRect.left) - offsetX;
    let top  = (e.clientY - stageRect.top) - offsetY;

    const maxLeft = stage.clientWidth - activeImg.offsetWidth;
    const maxTop  = stage.clientHeight - activeImg.offsetHeight;

    left = Math.max(0, Math.min(left, Math.max(0, maxLeft)));
    top  = Math.max(0, Math.min(top,  Math.max(0, maxTop)));

    activeImg.style.left = `${left}px`;
    activeImg.style.top  = `${top}px`;

    e.preventDefault();
  };

  const stopDrag = () => { activeImg = null; };

  draggables.forEach((img) => {
    img.addEventListener("pointerdown", startDrag);
    img.addEventListener("pointermove", moveDrag);
    img.addEventListener("pointerup", stopDrag);
    img.addEventListener("pointercancel", stopDrag);
    img.addEventListener("lostpointercapture", stopDrag);
  });

  stage.addEventListener("dragstart", (e) => e.preventDefault());

  // --- POSICIONADO ALEATORIO + SEPARADO ---
  const waitForImages = (imgs) =>
    Promise.all(
      imgs.map((img) => {
        if (img.decode) return img.decode().catch(() => {});
        if (img.complete) return Promise.resolve();
        return new Promise((res) => img.addEventListener("load", res, { once: true }));
      })
    );

  const placeSeparatedRandom = () => {
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    if (W < 10 || H < 10) return false; // stage aún sin tamaño

    const MIN_GAP = 90;     // más grande = más separadas
    const EDGE_PAD = 12;
    const MAX_TRIES = 900;

    const placed = []; // {x,y,w,h}

    const tooClose = (a, b, gap) => {
      return !(
        a.x + a.w + gap < b.x ||
        b.x + b.w + gap < a.x ||
        a.y + a.h + gap < b.y ||
        b.y + b.h + gap < a.y
      );
    };

    draggables.forEach((img) => {
      const w = img.offsetWidth;
      const h = img.offsetHeight;

      const maxX = Math.max(EDGE_PAD, W - w - EDGE_PAD);
      const maxY = Math.max(EDGE_PAD, H - h - EDGE_PAD);

      let x = EDGE_PAD, y = EDGE_PAD, ok = false;

      for (let t = 0; t < MAX_TRIES; t++) {
        x = EDGE_PAD + Math.random() * (maxX - EDGE_PAD);
        y = EDGE_PAD + Math.random() * (maxY - EDGE_PAD);

        const cand = { x, y, w, h };
        ok = placed.every(p => !tooClose(cand, p, MIN_GAP));
        if (ok) break;
      }

      img.style.left = `${x}px`;
      img.style.top  = `${y}px`;

      placed.push({ x, y, w, h });
    });

    return true;
  };

  // Espera a que carguen y a que haya layout estable
  const runPlacement = () => {
    let tries = 0;
    const tick = () => {
      if (placeSeparatedRandom() || tries++ > 40) return;
      requestAnimationFrame(tick);
    };
    tick();
  };

  waitForImages(draggables).then(() => {
    // dos frames para evitar “stage mide 0” por layout tardío
    requestAnimationFrame(() => requestAnimationFrame(runPlacement));
  });

  // Si cambia el tamaño de ventana, recoloca (opcional)
  window.addEventListener("resize", () => {
    placeSeparatedRandom();
  });
});