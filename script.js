const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

const root = document.documentElement;
const heroCollage = document.getElementById("heroCollage");
const galleryGrid = document.getElementById("galleryGrid");
const stackedGallery = document.getElementById("stackedGallery");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxDescription = document.getElementById("lightboxDescription");
const progressFill = document.querySelector(".progress-bar span");

const mediaLibrary = [
  {
    title: "Golden Hour Vows",
    category: "Wedding",
    description: "Soft sunset light with a quiet editorial feel.",
    size: "feature",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#c0824a", end: "#6f7c5a", soft: "#f0d7b4" },
  },
  {
    title: "Saltwater Quiet",
    category: "Seascape",
    description: "Coastal tones with wind and motion.",
    size: "tall",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#8b6a5c", end: "#bfa26b", soft: "#efe2c5" },
  },
  {
    title: "Pine and Linen",
    category: "Portrait",
    description: "Natural light portrait with calm texture.",
    size: "square",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#6f7c5a", end: "#a98f6a", soft: "#e7dcc8" },
  },
  {
    title: "City Afterlight",
    category: "Street",
    description: "Evening lines and warm reflections.",
    size: "wide",
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#b07755", end: "#6b5b48", soft: "#f2dcc4" },
  },
  {
    title: "Studio Bloom",
    category: "Editorial",
    description: "Softbox glow and minimal styling.",
    size: "tall",
    src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#c18d67", end: "#9c7b5d", soft: "#f5e2cf" },
  },
  {
    title: "Glasshouse",
    category: "Architecture",
    description: "Clean geometry with warm steel.",
    size: "square",
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#7a8470", end: "#c0a57a", soft: "#e2d2b8" },
  },
  {
    title: "Desert Frame",
    category: "Travel",
    description: "Sun, wind, and open space.",
    size: "banner",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#c0895a", end: "#9a6b4a", soft: "#f2d9b8" },
  },
  {
    title: "Rainy Letters",
    category: "Documentary",
    description: "Quiet moments in soft weather.",
    size: "square",
    src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#6a5f54", end: "#8b7c6d", soft: "#e4d6c5" },
  },
  {
    title: "Moonlit Dunes",
    category: "Landscape",
    description: "Low light and soft gradients.",
    size: "tall",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#8a725f", end: "#5e564f", soft: "#d9c8b6" },
  },
  {
    title: "Paper Crane",
    category: "Still Life",
    description: "Texture, shadows, and a calm set.",
    size: "wide",
    src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#c0a07a", end: "#8a735d", soft: "#f0dfc9" },
  },
  {
    title: "Neon Market",
    category: "Travel",
    description: "Night color with restrained glow.",
    size: "square",
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#b06a5a", end: "#7c5a57", soft: "#f2d3c8" },
  },
  {
    title: "Hilltop Ceremony",
    category: "Wedding",
    description: "A wide frame for the full story.",
    size: "wide",
    src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#a0785a", end: "#6f7c5a", soft: "#e8d5bf" },
  },
  {
    title: "Studio Window",
    category: "Portrait",
    description: "Soft shadow and a quiet expression.",
    size: "tall",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#b28a6a", end: "#8c6f5d", soft: "#ead9c7" },
  },
  {
    title: "Copper Fields",
    category: "Landscape",
    description: "Late light and warm horizon tones.",
    size: "wide",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#c08a5e", end: "#7c6a56", soft: "#f0d9c2" },
  },
  {
    title: "Sunday Market",
    category: "Documentary",
    description: "Street rhythm and candid details.",
    size: "square",
    src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#9a7a63", end: "#6d5f54", soft: "#e7d3c1" },
  },
  {
    title: "Rainroom",
    category: "Editorial",
    description: "Moody light with a fashion edge.",
    size: "tall",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#a4816d", end: "#7b6658", soft: "#ead8c8" },
  },
  {
    title: "Olive Terrace",
    category: "Travel",
    description: "Warm stone, linen, and open air.",
    size: "wide",
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#a98a6a", end: "#6e7b5a", soft: "#eadcc6" },
  },
  {
    title: "Midnight Film",
    category: "Street",
    description: "Low light with a soft glow.",
    size: "square",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#866a5e", end: "#5a4c46", soft: "#d7c6b8" },
  },
  {
    title: "Lakeside Notes",
    category: "Lifestyle",
    description: "Quiet details and open water.",
    size: "banner",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#9b7f6a", end: "#6a6f5d", soft: "#e8d6c6" },
  },
  {
    title: "Archive Still",
    category: "Still Life",
    description: "Texture, shadow, and quiet form.",
    size: "square",
    src: "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1200&q=80",
    palette: { start: "#b08c6c", end: "#7a6b5c", soft: "#efddca" },
  },
];

const heroLayouts = ["hero-card--main", "hero-card--upper", "hero-card--side", "hero-card--mini"];
const stackLayouts = ["stack-frame--one", "stack-frame--two", "stack-frame--three"];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildFallbackArt(title, category, palette, index) {
  const titleSafe = escapeHtml(title);
  const categorySafe = escapeHtml(category);
  const xA = 220 + index * 31;
  const xB = 900 - index * 28;
  const yB = 180 + index * 12;
  const yC = 720 - index * 14;
  const waveA = 604 + index * 4;
  const waveB = 662 + index * 4;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.start}" />
          <stop offset="100%" stop-color="${palette.end}" />
        </linearGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="38" /></filter>
        <radialGradient id="shine" cx="50%" cy="36%" r="62%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.42" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" />
      <circle cx="${xA}" cy="240" r="180" fill="#ffffff" opacity="0.22" filter="url(#blur)" />
      <circle cx="${xB}" cy="${yB}" r="220" fill="#ffffff" opacity="0.14" filter="url(#blur)" />
      <circle cx="860" cy="${yC}" r="260" fill="${palette.soft}" opacity="0.24" filter="url(#blur)" />
      <circle cx="640" cy="260" r="180" fill="url(#shine)" />
      <path d="M0 ${waveA} C 220 ${waveA - 96}, 340 ${waveA + 62}, 560 ${waveA - 10} S 960 ${waveA - 92}, 1200 ${waveA + 26}" fill="none" stroke="#ffffff" stroke-opacity="0.36" stroke-width="4" />
      <path d="M0 ${waveB} C 220 ${waveB - 82}, 360 ${waveB + 76}, 560 ${waveB + 16} S 980 ${waveB - 68}, 1200 ${waveB + 48}" fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="2" />
      <rect x="54" y="54" width="1092" height="792" rx="48" fill="none" stroke="#ffffff" stroke-opacity="0.24" stroke-width="2" />
      <text x="78" y="736" fill="#ffffff" font-family="Cormorant Garamond, serif" font-size="70" font-weight="600">${titleSafe}</text>
      <text x="80" y="794" fill="#ffffff" fill-opacity="0.82" font-family="Manrope, sans-serif" font-size="28" font-weight="500">${categorySafe}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderMediaCard(item, index, variant) {
  const fallback = buildFallbackArt(item.title, item.category, item.palette, index);
  const loading = variant === "hero" && index === 0 ? "eager" : "lazy";
  const layoutClass =
    variant === "hero"
      ? `media-card hero-card ${heroLayouts[index] ?? heroLayouts[0]}`
      : variant === "stack"
        ? `media-card stack-frame ${stackLayouts[index] ?? stackLayouts[0]}`
        : `media-card gallery-card ${item.size}`;

  return `
    <button
      type="button"
      class="${layoutClass} tilt-card"
      data-preview="true"
      data-title="${escapeHtml(item.title)}"
      data-category="${escapeHtml(item.category)}"
      data-description="${escapeHtml(item.description)}"
      data-src="${escapeHtml(item.src)}"
      aria-label="Open preview for ${escapeHtml(item.title)}"
    >
      <span class="card-chip">${String(index + 1).padStart(2, "0")} / ${escapeHtml(item.category)}</span>
      <img
        src="${escapeHtml(item.src)}"
        alt="${escapeHtml(item.title)}"
        loading="${loading}"
        decoding="async"
        data-fallback="${escapeHtml(fallback)}"
      />
      <div class="card-overlay"></div>
      <div class="card-sheen"></div>
      <div class="card-copy">
        <p>${escapeHtml(item.category)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <span>${escapeHtml(item.description)}</span>
      </div>
    </button>
  `;
}

function updateProgress() {
  if (!progressFill) {
    return;
  }

  const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
  progressFill.style.width = `${Math.max(0, Math.min(progress * 100, 100))}%`;
}

function animateCount(element) {
  const target = Number(element.dataset.count || 0);
  const duration = 1200;
  const startedAt = performance.now();

  function tick(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function bindImageFallbacks() {
  document.querySelectorAll("img[data-fallback]").forEach((image) => {
    const applyFallback = () => {
      const fallback = image.dataset.fallback;
      if (fallback && image.src !== fallback) {
        image.src = fallback;
      }
    };

    image.addEventListener("error", applyFallback, { once: true });

    if (image.complete && image.naturalWidth === 0) {
      applyFallback();
    }
  });
}

function initRevealObservers() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((section, index) => {
    section.style.setProperty("--reveal-delay", `${Math.min(index * 90, 380)}ms`);
    revealObserver.observe(section);
  });

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.65,
    }
  );

  document.querySelectorAll(".count-up").forEach((counter) => countObserver.observe(counter));
}

function initTiltCards() {
  if (prefersReducedMotion || !finePointer) {
    return;
  }

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 14;
      const rotateY = (x - 0.5) * 14;

      card.style.setProperty("--tilt-x", `${rotateX}deg`);
      card.style.setProperty("--tilt-y", `${rotateY}deg`);
      card.style.setProperty("--lift", "-6px");
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--lift", "0px");
    });
  });
}

function initLightbox() {
  if (!lightbox) {
    return;
  }

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  };

  const openLightbox = (dataset, imageSrc) => {
    lightboxTitle.textContent = dataset.title || "Untitled";
    lightboxCategory.textContent = dataset.category || "Featured frame";
    lightboxDescription.textContent = dataset.description || "";
    lightboxImage.src = imageSrc || dataset.src || "";
    lightboxImage.alt = dataset.title || "Preview image";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-preview='true']");
    if (trigger) {
      event.preventDefault();
      const previewImage = trigger.querySelector("img");
      const imageSrc = previewImage
        ? previewImage.complete && previewImage.naturalWidth === 0
          ? previewImage.dataset.fallback || previewImage.src
          : previewImage.currentSrc || previewImage.src
        : trigger.dataset.src;

      openLightbox(trigger.dataset, imageSrc);
      return;
    }

    if (event.target.closest("[data-close]") || event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}

function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  let stars = [];
  const pointer = {
    x: 0,
    y: 0,
    active: false,
  };

  function createStar() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: (Math.random() * 1.6 + 0.5) * devicePixelRatio,
      speed: (Math.random() * 0.16 + 0.03) * devicePixelRatio,
      drift: (Math.random() - 0.5) * 0.12 * devicePixelRatio,
      alpha: Math.random() * 0.4 + 0.12,
      hue: Math.random() < 0.5 ? "196,177,156" : "150,132,114",
      twinkle: Math.random() * Math.PI * 2,
    };
  }

  function resize() {
    devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.floor(window.innerWidth * devicePixelRatio);
    height = Math.floor(window.innerHeight * devicePixelRatio);
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const starCount = prefersReducedMotion ? 24 : Math.min(96, Math.round((window.innerWidth * window.innerHeight) / 26000));
    stars = Array.from({ length: starCount }, createStar);
  }

  function drawStars(animate) {
    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "screen";

    stars.forEach((star) => {
      if (animate) {
        star.twinkle += 0.015;
        star.x += star.speed;
        star.y += star.drift;

        if (pointer.active) {
          const dx = star.x - pointer.x;
          const dy = star.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;
          const reach = 240 * devicePixelRatio;

          if (distance < reach) {
            const pull = (1 - distance / reach) * 0.6;
            star.x += (dx / distance) * pull;
            star.y += (dy / distance) * pull;
          }
        }

        if (star.x > width + 20) {
          star.x = -20;
        }
        if (star.y > height + 20) {
          star.y = -20;
        }
        if (star.y < -20) {
          star.y = height + 20;
        }
      }

      const pulse = 0.45 + Math.sin(star.twinkle) * 0.28;
      const alpha = Math.min(0.95, star.alpha * pulse);

      context.beginPath();
      context.fillStyle = `rgba(${star.hue}, ${alpha})`;
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();

      if (star.radius > 1.2 * devicePixelRatio) {
        context.beginPath();
        context.fillStyle = `rgba(${star.hue}, ${Math.min(0.24, alpha * 0.4)})`;
        context.arc(star.x, star.y, star.radius * 2.6, 0, Math.PI * 2);
        context.fill();
      }
    });
  }

  function animate() {
    drawStars(true);
    requestAnimationFrame(animate);
  }

  resize();
  drawStars(false);

  if (!prefersReducedMotion) {
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    resize();
    drawStars(false);
  });

  window.addEventListener("pointermove", (event) => {
    root.style.setProperty("--pointer-x", `${event.clientX}px`);
    root.style.setProperty("--pointer-y", `${event.clientY}px`);
    pointer.x = event.clientX * devicePixelRatio;
    pointer.y = event.clientY * devicePixelRatio;
    pointer.active = true;
  });

  window.addEventListener("pointerleave", () => {
    pointer.active = false;
  });
}

function initProgress() {
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
}

function initContent() {
  const heroItems = mediaLibrary.slice(0, 4);
  const galleryItems = mediaLibrary;
  const stackItems = [mediaLibrary[4], mediaLibrary[6], mediaLibrary[9]];

  heroCollage.innerHTML = heroItems.map((item, index) => renderMediaCard(item, index, "hero")).join("");
  galleryGrid.innerHTML = galleryItems.map((item, index) => renderMediaCard(item, index, "gallery")).join("");
  stackedGallery.innerHTML = stackItems.map((item, index) => renderMediaCard(item, index, "stack")).join("");

  bindImageFallbacks();
}

root.style.setProperty("--pointer-x", "50vw");
root.style.setProperty("--pointer-y", "18vh");

initContent();
initRevealObservers();
initTiltCards();
initLightbox();
initStarfield();
initProgress();
