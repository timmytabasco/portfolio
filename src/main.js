// Hamburger Menu Funktionalität 
const hamburgerBtn = document.querySelector('#hamburger');
const mobileMenu = document.querySelector('#mobile-menu');
const mobileOverlay = document.querySelector('#mobile-overlay');
const menuItems = document.querySelectorAll('.menu-item');
const hamburgerLine1 = document.querySelector('#hamburger-line-1');
const hamburgerLine2 = document.querySelector('#hamburger-line-2');
const hamburgerLine3 = document.querySelector('#hamburger-line-3');

let isMenuOpen = false;

function openMenu() {
  isMenuOpen = true;
  
  // Hamburger zu X animieren 
  hamburgerLine1.classList.add('rotate-45', 'translate-y-2');
  hamburgerLine2.classList.add('opacity-0');
  hamburgerLine3.classList.add('-rotate-45', '-translate-y-2');
  
  // Backdrop einblenden
  mobileOverlay.classList.remove('pointer-events-none', 'opacity-0');
  mobileOverlay.classList.add('opacity-100');
  
  // Menü Container öffnen
  mobileMenu.style.maxHeight = '500px';
  
  // Items nacheinander einblenden
  menuItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.remove('opacity-0', 'translate-y-8', 'scale-90');
      item.classList.add('opacity-100', 'translate-y-0', 'scale-100');
    }, 150 + (index * 100));
  });
  
  // Body Scroll verhindern
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  isMenuOpen = false;
  
  // Hamburger zurück zu normaler Form
  hamburgerLine1.classList.remove('rotate-45', 'translate-y-2');
  hamburgerLine2.classList.remove('opacity-0');
  hamburgerLine3.classList.remove('-rotate-45', '-translate-y-2');

  
  // Backdrop ausblenden
  mobileOverlay.classList.add('opacity-0', 'pointer-events-none');
  mobileOverlay.classList.remove('opacity-100');
  
  // Items verstecken
  menuItems.forEach(item => {
    item.classList.add('opacity-0', 'translate-y-8', 'scale-90');
    item.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
  });
  
  // Menü Container schließen
  mobileMenu.style.maxHeight = '0px';
  
  // Body Scroll wieder aktivieren
  document.body.style.overflow = 'auto';
}

// Event Listeners für Hamburger Menu
if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    isMenuOpen ? closeMenu() : openMenu();
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMenu);
}

menuItems.forEach(item => {
  const link = item.querySelector('a');
  if (link) {
    link.addEventListener('click', () => {
      closeMenu();
    });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMenuOpen) {
    closeMenu();
  }
});

// Touch-Scroll verhindern
if (mobileMenu) {
  mobileMenu.addEventListener('touchmove', (e) => {
    if (isMenuOpen) {
      e.preventDefault();
    }
  });
}

// Typewriter-Effekt (nur auf Hauptseite)
document.addEventListener("DOMContentLoaded", function () {
  const target = document.getElementById("typewriter");
  
  if (target) {
    const text = "Fachinformatiker für Anwendungsentwicklung";
    let index = 0;

    function type() {
      if (index < text.length) {
        target.textContent += text.charAt(index);
        index++;
        setTimeout(type, 25); // Tippgeschwindigkeit
      }
    }

    type();
  }
});

// Angepasstes Scrollverhalten für mobile Links
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault(); // standardmäßiges Springen verhindern

    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      // Menü schließen (vorher)
      closeMenu();

      // Nach kurzer Wartezeit scrollen (damit Menüanimation durch ist)
      setTimeout(() => {
        const headerHeight = document.querySelector('header').offsetHeight;
        const extraOffset = -65; // Feinjustierung – du kannst 0 oder 30 testen
        const position = target.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset;

        window.scrollTo({ top: position, behavior: 'smooth' });
      }, 200); // sollte zur Dauer deiner Menü-Animation passen
    }
  });
});

// Schließen des Menüs bei Klick auf Logo
const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('click', () => {
    if (isMenuOpen) {
      closeMenu();
    }
  });
}

// PAGE FADE-IN/OUT FUNKTIONALITÄT
document.addEventListener("DOMContentLoaded", () => {
  const pageBody = document.getElementById('page-body');
  const backLink = document.querySelector('#back-link');

  // Fade-In beim Laden der Seite
  if (pageBody) {
    setTimeout(() => {
      pageBody.classList.remove('opacity-0');
      pageBody.classList.add('opacity-100');
    }, 200);
  }

  // Fade-Out beim Klick auf Back-Link
  if (backLink) {
    backLink.addEventListener('click', (e) => {
      e.preventDefault();

      // Body ausblenden
      pageBody.classList.remove('opacity-100');
      pageBody.classList.add('opacity-0');

      // Warte kurz, dann weiterleiten
      setTimeout(() => {
        window.location.href = backLink.getAttribute('href');
      }, 500); // sollte zur Tailwind-Duration passen
    });
  }

  // Fade-Out für alle internen Links (optional)
  document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]').forEach(link => {
    // Ausnahme: Links mit # (Anker) oder externe Links
    if (!link.getAttribute('href').includes('#') && !link.hasAttribute('target')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();

        if (pageBody) {
          pageBody.classList.remove('opacity-100');
          pageBody.classList.add('opacity-0');
        }

        setTimeout(() => {
          window.location.href = link.getAttribute('href');
        }, 500);
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const btnToResume = document.getElementById('btn-to-resume');
  const btnToInfo = document.getElementById('btn-to-info');
  const slideInfo = document.getElementById('slide-info');
  const slideResume = document.getElementById('slide-resume');

  btnToResume?.addEventListener('click', () => {
    slideInfo.classList.add('-translate-x-full');
    slideResume.classList.remove('translate-x-full');
    slideResume.classList.add('translate-x-0');
  });

  btnToInfo?.addEventListener('click', () => {
    slideInfo.classList.remove('-translate-x-full');
    slideResume.classList.remove('translate-x-0');
    slideResume.classList.add('translate-x-full');
  });
});


// Öffnen und Schließen des Impressums

const openBtn = document.getElementById('open-impressum');
const closeBtn = document.getElementById('close-impressum');
const impressumModal = document.getElementById('impressum-modal');

if (openBtn && closeBtn && impressumModal) {
  openBtn.addEventListener('click', () => {
    impressumModal.classList.remove('opacity-0', 'pointer-events-none');
    impressumModal.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    impressumModal.classList.add('opacity-0', 'pointer-events-none');
    impressumModal.classList.remove('opacity-100');x^x
    document.body.style.overflow = 'auto';
  });

  // Optional: Klick außerhalb schließt das Modal
  impressumModal.addEventListener('click', (e) => {
    if (e.target === impressumModal) {
      closeBtn.click();
    }
  });

  // ESC-Taste schließt das Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && impressumModal.classList.contains('opacity-100')) {
      closeBtn.click();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // alle möglichen Fade-Typen
  const fadeElements = document.querySelectorAll(
    ".fade-in, .fade-in-left, .fade-in-right, .fade-in-down, .fade-in-up"
  );

  // IntersectionObserver erkennt, wann Element sichtbar wird
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-x-0", "translate-y-0", "scale-100");
          entry.target.classList.remove(
            "opacity-0",
            "translate-y-6",
            "-translate-y-6",
            "translate-x-6",
            "-translate-x-6",
            "scale-95"
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // jedes Element initialisieren
  fadeElements.forEach((el, i) => {
    // Basis-Animation
    el.classList.add(
      "opacity-0",
      "transition-all",
      "duration-700",
      "ease-out",
      "scale-95"
    );

    // Richtung bestimmen
    if (el.classList.contains("fade-in-left")) el.classList.add("-translate-x-6");
    else if (el.classList.contains("fade-in-right")) el.classList.add("translate-x-6");
    else if (el.classList.contains("fade-in-up")) el.classList.add("translate-y-6");
    else if (el.classList.contains("fade-in-down")) el.classList.add("-translate-y-6");
    else el.classList.add("translate-y-6");

    // 🔹 Verzögerung:
    // 1. Prüft, ob explizit data-delay gesetzt wurde
    // 2. Falls nicht, nutzt gestaffelte Animation basierend auf Index
    // Einheitliches Fade-In – alle gleichzeitig (oder mit leichtem Delay bei Bedarf)
    const customDelay = el.dataset.delay;
    el.style.transitionDelay = customDelay || "500ms"; // z. B. 200ms global für alle

    observer.observe(el);
  });
});



// ========== Projekt-Detail Slide-In ==========
const overlay = document.getElementById("project-overlay");
const panel = document.getElementById("project-detail");
const content = document.getElementById("project-content");
const closeButton = document.getElementById("close-project");

// Beispiel-Inhalte (du kannst später beliebig erweitern oder aus JSON laden)
const projects = {
  lehrwerk: {
    title: "Lehrwerk App",
    subtitle: "Fullstack-Webanwendung für Lehrwerk GmbH",
    image: "img/lehrwerk.png",
    description: `
      <p>Die <strong>Lehrwerk-App</strong> digitalisiert die interne Verwaltung von Kursen, Terminen und Kontaktanfragen.</p>
      <p>Sie basiert auf <strong>Node.js</strong>, <strong>Express</strong> und <strong>MariaDB</strong> 
      und bietet eine <strong>REST-API</strong> für dynamische Inhalte.</p>
      <p>Das Frontend nutzt <strong>Vanilla JS</strong> und <strong>Tailwind CSS</strong> 
      und enthält ein flexibles JSON-basiertes CMS.</p>
    `,
    features: [
      "CMS-System mit JSON-Contentsteuerung",
      "REST-API für Kurse, Termine, Kontakte",
      "Dateiuploads & Medienverwaltung",
      "Responsive Design mit Tailwind CSS"
    ],
    tech: ["Node.js", "Express", "MariaDB", "Tailwind CSS", "Vanilla JS"],
    links: {
      live: "https://app.lehrwerk.de",
      github: "https://github.com/typet-dev/lehrwerk-app"
    }
  },

  portfolio: {
    title: "Mein Portfolio",
    subtitle: "Meine persönliche Entwicklerseite",
    image: "img",
    description: `
      <p>Mein <strong>Portfolio</strong> präsentiert meine Projekte und Fähigkeiten in einem klaren, modernen Layout.</p>
      <p>Umgesetzt mit <strong>Vite</strong>, <strong>Tailwind CSS</strong> und <strong>Vanilla JS</strong> als leichte SPA.</p>
      <p>Enthält Animationen, Fade-In-Effekte und ein modulares System für neue Projekte.</p>
    `,
    features: [
      "Single-Page-Layout mit Intersection-Observer-Animationen",
      "Fade-In & Transition-System für sanftes SPA-Feeling",
      "Responsive Grid-Layout & Projektkomponenten",
      "Modular erweiterbar durch JSON-basierte Datenstruktur"
    ],
    tech: ["Vite", "Tailwind CSS", "JavaScript", "HTML5", "Git"],
    links: {
      live: "/",
      github: "https://github.com/timmytabasco/portfolio"
    }
  }
};

// Öffnen
function openProject(id) {
  const project = projects[id];
  if (!project) return;

  // Inhalt dynamisch aufbauen
  content.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="w-full rounded-2xl shadow-lg mb-6">
    <h2 class="text-3xl font-bold text-neutral-900">${project.title}</h2>
    <p class="text-lg text-stone-600 mb-4">${project.subtitle}</p>
    <div class="text-stone-700 leading-relaxed space-y-4">${project.description}</div>

    <div>
      <h3 class="text-xl font-semibold mt-8 mb-3">Features</h3>
      <ul class="list-disc pl-6 space-y-2 text-stone-700">
        ${project.features.map(f => `<li>${f}</li>`).join("")}
      </ul>
    </div>

    <div>
      <h3 class="text-xl font-semibold mt-8 mb-3">Technologien</h3>
      <div class="flex flex-wrap gap-2">
        ${project.tech.map(t => `
          <span class="px-3 py-1 bg-yellow-100 text-stone-700 text-sm rounded-full font-medium">${t}</span>
        `).join("")}
      </div>
    </div>

    <div class="flex justify-between items-center mt-10">
      <a href="${project.links.live}" target="_blank" class="text-yellow-700 font-semibold hover:text-yellow-800 transition">🔗 Live-Demo</a>
      <a href="${project.links.github}" target="_blank" class="text-stone-700 font-semibold hover:text-stone-900 transition">💻 GitHub</a>
    </div>
  `;

  // Overlay anzeigen
  overlay.classList.remove("hidden");
  setTimeout(() => {
    overlay.classList.add("opacity-100");
    panel.classList.remove("translate-x-full");
  }, 10);

  document.body.style.overflow = "hidden";
}

// Schließen
function closeProject() {
  overlay.classList.remove("opacity-100");
  panel.classList.add("translate-x-full");
  setTimeout(() => overlay.classList.add("hidden"), 500);
  document.body.style.overflow = "auto";
}

closeButton.addEventListener("click", closeProject);
overlay.addEventListener("click", e => { if (e.target === overlay) closeProject(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeProject(); });


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const toast = document.createElement("div");

    // Tailwind-Styling für den Toast
    toast.className = `
      fixed bottom-8 left-1/2 transform -translate-x-1/2
      bg-neutral-900 text-yellow-50 px-6 py-3 rounded-xl
      shadow-lg opacity-0 transition-all duration-500
    `;

    document.body.appendChild(toast);

    try {
      const response = await fetch("https://formspree.io/f/xnngbnnn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        toast.textContent = "✅ Nachricht erfolgreich gesendet!";
        form.reset();
      } else {
        toast.textContent = "❌ Fehler beim Senden. Bitte später erneut versuchen.";
        toast.classList.add("bg-red-600");
      }
    } catch (error) {
      toast.textContent = "⚠️ Netzwerkfehler. Bitte überprüfe deine Verbindung.";
      toast.classList.add("bg-red-600");
    }

    // Sichtbar machen
    requestAnimationFrame(() => toast.classList.add("opacity-100", "translate-y-0"));

    // Nach 5 Sekunden automatisch ausblenden + entfernen
    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
      setTimeout(() => toast.remove(), 500); // nach Fade-Out löschen
    }, 5000);
  });
});
