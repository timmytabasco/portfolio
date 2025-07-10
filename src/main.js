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
    const text = "Angehender Fachinformatiker für Anwendungsentwicklung! ✨";
    let index = 0;

    function type() {
      if (index < text.length) {
        target.textContent += text.charAt(index);
        index++;
        setTimeout(type, 30); // Tippgeschwindigkeit
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
const modal = document.getElementById('impressum-modal');

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener('click', () => {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    document.body.style.overflow = 'auto';
  });

  // Optional: Klick außerhalb schließt das Modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });

  // ESC-Taste schließt das Modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('opacity-100')) {
      closeBtn.click();
    }
  });
}
