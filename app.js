/* ==========================================================================
   CYBERPUNK FUNCTIONAL CONTROLLER - NAMAN GUPTA PORTFOLIO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initCursorSpotlight();
  initThemeManager();
  initCanvasParticles();
  initSkillsFilter();
  initProjectModals();
  initScrollReveals();
  initContactUtils();
  initMobileMenu();
});

/* ==========================================================================
   DYNAMIC INTERACTIVE HUD SPOTLIGHT (LERP INTERPOLATION)
   ========================================================================== */
function initCursorSpotlight() {
  const cursorGlow = document.getElementById("cursor-glow");
  if (!cursorGlow) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  
  // Smoothing ratio for luxury transition delays
  const smoothing = 0.1;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * smoothing;
    currentY += (mouseY - currentY) * smoothing;

    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
}

/* ==========================================================================
   DYNAMIC SYSTEM THEMES MANAGER
   ========================================================================== */
function initThemeManager() {
  const themeBtns = document.querySelectorAll(".theme-btn");
  const body = document.body;

  const themeClasses = ["theme-purple", "theme-emerald", "theme-gold"];

  const savedTheme = localStorage.getItem("portfolio-cyberpunk-theme");
  if (savedTheme && savedTheme !== "cyan") {
    body.className = `theme-${savedTheme}`;
    updateActiveBtn(savedTheme);
  }

  themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedTheme = btn.dataset.theme;

      // Remove existing custom theme classes
      themeClasses.forEach((cls) => body.classList.remove(cls));

      // Add selected theme class if not default (cyan)
      if (selectedTheme !== "cyan") {
        body.classList.add(`theme-${selectedTheme}`);
      }

      // Store in localStorage
      localStorage.setItem("portfolio-cyberpunk-theme", selectedTheme);

      updateActiveBtn(selectedTheme);
      showToast(
        "Palette Recalibrated", 
        `Loaded extreme ${selectedTheme.toUpperCase()} color matrix successfully.`,
        false
      );
    });
  });

  function updateActiveBtn(theme) {
    themeBtns.forEach((b) => {
      if (b.dataset.theme === theme) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });
  }
}

/* ==========================================================================
   HIGH-PERFORMANCE INTERACTIVE NEURAL WEB BACKGROUND (WEBGL-LIKE MATRIX)
   ========================================================================== */
function initCanvasParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  // Track mouse coordinate offsets globally
  let mouse = { x: null, y: null, radius: 180 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  // Adjust complexity based on hardware
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 32 : 90;
  const connectionDistance = isMobile ? 80 : 120;

  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * h;
    }

    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2.2 + 0.8;
      
      // Cyber vectors
      this.speedX = Math.random() * 0.8 - 0.4;
      this.speedY = Math.random() * 0.8 - 0.4;
      
      // Glowing matrices
      this.alpha = Math.random() * 0.45 + 0.15;
      
      // Particle color toggling
      this.colorType = Math.random() > 0.55 ? 'primary' : 'secondary';
    }

    update() {
      // Mouse gravity repulsion/attraction loop
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Slowly push particle away from cursor
          this.x -= dx / dist * force * 1.5;
          this.y -= dy / dist * force * 1.5;
        }
      }

      this.x += this.speedX;
      this.y += this.speedY;

      // Elastic bounding check
      if (this.x < 0 || this.x > w) this.speedX *= -1;
      if (this.y < 0 || this.y > h) this.speedY *= -1;
    }

    draw() {
      const primaryColor = getComputedStyle(document.body).getPropertyValue('--primary').trim() || '#00e5ff';
      const secondaryColor = getComputedStyle(document.body).getPropertyValue('--secondary').trim() || '#ff007f';
      const color = this.colorType === 'primary' ? primaryColor : secondaryColor;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  // Generate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Draw lines linking close nodes (WebGL vector neural mesh)
  function drawConnections() {
    const primaryColorRGB = getComputedStyle(document.body).getPropertyValue('--primary-rgb').trim() || '0, 229, 255';
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          // Opacity fades out based on distance
          const lineAlpha = (1 - dist / connectionDistance) * 0.14;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${primaryColorRGB}, ${lineAlpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, w, h);
    
    // Draw connecting paths first (underlay)
    drawConnections();

    // Update and render nodes
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(loop);
  }

  loop();
}

/* ==========================================================================
   SKILLS GRID FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const activeFilter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      skillCards.forEach((card) => {
        const category = card.dataset.category;

        if (activeFilter === "all" || category === activeFilter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.93)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   DYNAMIC CYBER CASE STUDIES OVERLAY MODALS
   ========================================================================== */
const projectDatabase = {
  "1": {
    title: "Aura Ledger - Web3 Accounting Matrix",
    description: "Aura Ledger compiles Web3 network logs and token distributions into an ultra-glowing diagnostic interface. It leverages asynchronous node querying to track multi-chain ledger states in real time, making massive blockchain datasets fully legible to crypto traders.",
    role: "Lead Interface Architect",
    timeline: "April 2026 (3 Weeks)",
    tags: ["React", "CSS Modules", "ApexCharts", "Web3 Node API"],
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200",
    features: [
      "Dynamic data queries aggregating balances from Ethereum, Solana, and BSC.",
      "Custom ApexCharts integrations detailing historical yield metrics.",
      "Real-time smart contract gas fee estimators with zero main-thread block.",
      "High contrast visual architecture supporting fluid viewport scaling and active themes."
    ],
    live: "https://github.com/naman200811"
  },
  "2": {
    title: "DevSync - Real-time Coding Hub",
    description: "DevSync aggregates multi-client editing signals into a synchronous code environment. Powered by active Socket threads, it handles simultaneous edits, virtual project tree structures, and integrated peer voice feeds with low-latency responsiveness.",
    role: "Fullstack Engine developer",
    timeline: "March 2026 (4 Weeks)",
    tags: ["Socket.io", "HTML5 Canvas", "Vanilla JS", "Node.js"],
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=1200",
    features: [
      "Conflict-free Operational Transform algorithms syncing client cursor frames.",
      "Canvas-rendered cursor shadows mapping teammate coordinates dynamically.",
      "Virtual folder tree structure handling live JSON configuration exports.",
      "Integrates fully validated WebRTC protocols for seamless peer communication."
    ],
    live: "https://github.com/naman200811"
  },
  "3": {
    title: "Synapse - AI Latency Logger",
    description: "Synapse visualizes prompts latency, completions cache rates, and model resource footprints in a high-fidelity visual layout. Built with CSS custom parameters, it updates active logs on the fly, rendering system query paths with clear graphic feedback.",
    role: "Logic Engineer & visual designer",
    timeline: "January 2026 (2 Weeks)",
    tags: ["HTML5", "Figma Prototyping", "CSS Variables", "LocalCache"],
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200",
    features: [
      "Frosted dashboard panel matrices visualizing active telemetry grids.",
      "Dynamic latency diagnostics rendered through custom responsive SVGs.",
      "Prompt cache utilities decreasing typical query loops by up to 38%.",
      "Highly responsive vector structures adjusting gracefully to desktop and mobile frames."
    ],
    live: "https://github.com/naman200811"
  }
};

function initProjectModals() {
  const modal = document.getElementById("project-detail-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  
  const mTitle = document.getElementById("modal-title");
  const mDesc = document.getElementById("modal-desc");
  const mImage = document.getElementById("modal-image");
  const mRole = document.getElementById("modal-role");
  const mTimeline = document.getElementById("modal-timeline");
  const mTags = document.getElementById("modal-tags");
  const mFeatures = document.getElementById("modal-features");
  const mLiveLink = document.getElementById("modal-live-link");

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = trigger.closest(".project-card");
      if (!card) return;

      const projId = card.dataset.projId;
      const data = projectDatabase[projId];
      if (!data) return;

      mTitle.textContent = data.title;
      mDesc.textContent = data.description;
      mImage.src = data.image;
      mRole.textContent = data.role;
      mTimeline.textContent = data.timeline;
      mLiveLink.href = data.live;

      mTags.innerHTML = "";
      data.tags.forEach((t) => {
        const tagSpan = document.createElement("span");
        tagSpan.className = "modal-meta-tag";
        tagSpan.textContent = t;
        mTags.appendChild(tagSpan);
      });

      mFeatures.innerHTML = "";
      data.features.forEach((f) => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="fa-solid fa-square-check"></i> <span>${f}</span>`;
        mFeatures.appendChild(li);
      });

      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

/* ==========================================================================
   VIEWPORT FADE-IN REVEAL EFFECTS & COUNTERS
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal-element");
  const statsNums = document.querySelectorAll(".stat-num");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active-reveal");
          
          if (entry.target.classList.contains("bio-card")) {
            triggerStatsCounters();
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  let countersStarted = false;
  function triggerStatsCounters() {
    if (countersStarted) return;
    countersStarted = true;

    statsNums.forEach((item) => {
      const targetVal = parseInt(item.dataset.val);
      let currentVal = 0;
      const duration = 1200;
      const steps = 40;
      const increment = Math.ceil(targetVal / steps);
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        currentVal += increment;
        if (currentVal >= targetVal) {
          item.textContent = `${targetVal}+`;
          clearInterval(timer);
        } else {
          item.textContent = `${currentVal}+`;
        }
      }, stepTime);
    });
  }

  // Active Link navigation tracker on scrolling
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav-panel a");

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    sections.forEach((sec) => {
      const sectionTop = sec.offsetTop;
      if (window.scrollY >= sectionTop - 180) {
        currentSectionId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   CONTACT FORM & TOAST UTILITIES
   ========================================================================== */
function initContactUtils() {
  const emailBox = document.getElementById("email-copy-box");
  const contactForm = document.getElementById("contact-feedback-form");
  const submitBtn = document.getElementById("submit-btn");

  if (emailBox) {
    emailBox.addEventListener("click", () => {
      const email = "naman200811@gmail.com";
      navigator.clipboard.writeText(email)
        .then(() => {
          const copyIcon = emailBox.querySelector(".copy-action-btn i");
          copyIcon.className = "fa-solid fa-check";
          copyIcon.style.color = "#39ff14";
          
          showToast(
            "Frequency Synced",
            "Naman's email (naman200811@gmail.com) successfully copied to clipboard buffers.",
            true
          );

          setTimeout(() => {
            copyIcon.className = "fa-regular fa-clone";
            copyIcon.style.color = "";
          }, 2000);
        })
        .catch(() => {
          showToast("Copy Failed", "Terminal pipeline block. Please copy text string manually.", false);
        });
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("form-name").value;
      const subject = document.getElementById("form-subject").value;

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      // Simulate API latency buffer (1.8 seconds)
      setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.classList.add("success");
        submitBtn.querySelector("span").textContent = "Sent Successfully";
        submitBtn.querySelector("i").className = "fa-solid fa-circle-check";

        showToast(
          "Transmission Complete",
          `Naman, your packet containing the subject "${subject}" is delivered successfully!`,
          true
        );

        setTimeout(() => {
          contactForm.reset();
          submitBtn.classList.remove("success");
          submitBtn.disabled = false;
          submitBtn.querySelector("span").textContent = "Send Message";
          submitBtn.querySelector("i").className = "fa-solid fa-paper-plane";
        }, 3000);

      }, 1800);
    });
  }
}

/* ==========================================================================
   DYNAMIC TOAST MANAGER
   ========================================================================== */
function showToast(title, body, isSuccess) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const card = document.createElement("div");
  card.className = `toast-alert-card ${isSuccess ? "success-toast" : ""}`;
  
  const icon = isSuccess ? "fa-solid fa-circle-check" : "fa-solid fa-terminal";
  
  card.innerHTML = `
    <div class="toast-status-icon"><i class="${icon}"></i></div>
    <div class="toast-info-text">
      <h5>${title}</h5>
      <p>${body}</p>
    </div>
  `;

  container.appendChild(card);

  setTimeout(() => card.classList.add("show"), 50);

  setTimeout(() => {
    card.classList.remove("show");
    setTimeout(() => card.remove(), 500);
  }, 4500);
}

/* ==========================================================================
   RESPONSIVE DRAPE NAV MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const mobileMenu = document.getElementById("mobile-nav-menu");
  const menuLinks = document.querySelectorAll("#mobile-nav-menu a");

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    const icon = toggleBtn.querySelector("i");
    
    if (mobileMenu.classList.contains("open")) {
      icon.className = "fa-solid fa-xmark";
    } else {
      icon.className = "fa-solid fa-bars-staggered";
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      toggleBtn.querySelector("i").className = "fa-solid fa-bars-staggered";
    });
  });
}
