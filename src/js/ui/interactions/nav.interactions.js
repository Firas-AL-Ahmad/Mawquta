const NAV_LINK_SELECTOR = ".site-header__nav .site-header__link[href^='#']";
const ACTIVE_CLASS = "site-header__link--active";
const ACTIVE_BOOTSTRAP_CLASS = "active";
const MOBILE_MEDIA_QUERY = "(max-width: 991.98px)";

function normalizeHashToId(hashValue) {
  if (typeof hashValue !== "string" || !hashValue.startsWith("#")) {
    return null;
  }

  const id = decodeURIComponent(hashValue.slice(1)).trim();
  return id || null;
}

function setActiveLink(navLinks, activeLink) {
  navLinks.forEach((navLink) => {
    const isActive = navLink === activeLink;
    navLink.classList.toggle(ACTIVE_CLASS, isActive);
    navLink.classList.toggle(ACTIVE_BOOTSTRAP_CLASS, isActive);

    if (isActive) {
      navLink.setAttribute("aria-current", "page");
    } else {
      navLink.removeAttribute("aria-current");
    }
  });
}

function bindMobileMenuInteractions(headerRoot, navLinks) {
  const menuToggleButton = headerRoot.querySelector(
    ".site-header__menu-toggle",
  );
  const panelElement = headerRoot.querySelector(".site-header__panel");

  if (!menuToggleButton || !panelElement) {
    return;
  }

  const mediaQueryList =
    typeof window.matchMedia === "function"
      ? window.matchMedia(MOBILE_MEDIA_QUERY)
      : null;

  const bootstrapCollapse =
    panelElement instanceof HTMLElement && window.bootstrap?.Collapse
      ? window.bootstrap.Collapse.getOrCreateInstance(panelElement, {
          toggle: false,
        })
      : null;

  const isMobileViewport = () => {
    if (!mediaQueryList) {
      return window.innerWidth <= 992;
    }

    return Boolean(mediaQueryList.matches);
  };

  const closeMenu = () => {
    if (bootstrapCollapse) {
      bootstrapCollapse.hide();
      return;
    }

    menuToggleButton.setAttribute("aria-expanded", "false");
    panelElement.classList.remove("show");
  };

  if (!bootstrapCollapse) {
    menuToggleButton.addEventListener("click", (event) => {
      event.preventDefault();

      const isExpanded =
        menuToggleButton.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        menuToggleButton.setAttribute("aria-expanded", "true");
        panelElement.classList.add("show");
      }
    });
  }

  if (bootstrapCollapse) {
    panelElement.addEventListener("shown.bs.collapse", () => {
      menuToggleButton.setAttribute("aria-expanded", "true");
    });

    panelElement.addEventListener("hidden.bs.collapse", () => {
      menuToggleButton.setAttribute("aria-expanded", "false");
    });
  }

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      if (isMobileViewport()) {
        closeMenu();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!isMobileViewport()) {
      return;
    }

    const eventTarget = event.target;
    if (!(eventTarget instanceof Node)) {
      return;
    }

    if (!headerRoot.contains(eventTarget)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeMenu();
  });

  if (mediaQueryList && typeof mediaQueryList.addEventListener === "function") {
    mediaQueryList.addEventListener("change", () => {
      if (!isMobileViewport()) {
        closeMenu();
      }
    });
  }
}

function scrollToSection(targetSection) {
  if (!targetSection) {
    return;
  }

  const headerElement = document.querySelector(".site-header");
  const headerHeight = Math.max(0, headerElement?.offsetHeight || 0);
  const targetTop =
    window.scrollY +
    targetSection.getBoundingClientRect().top -
    headerHeight -
    8;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
}

export function bindNavInteractions(headerRoot = document) {
  if (!headerRoot) {
    return undefined;
  }

  const navLinks = Array.from(headerRoot.querySelectorAll(NAV_LINK_SELECTOR));
  if (navLinks.length === 0) {
    return undefined;
  }

  const sectionToLink = new Map();

  navLinks.forEach((navLink) => {
    const sectionId = normalizeHashToId(navLink.getAttribute("href"));
    if (!sectionId) {
      return;
    }

    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) {
      return;
    }

    sectionToLink.set(sectionElement, navLink);
  });

  const observedSections = Array.from(sectionToLink.keys());
  if (observedSections.length === 0) {
    return undefined;
  }

  const initiallyActiveLink =
    navLinks.find((navLink) => navLink.classList.contains(ACTIVE_CLASS)) ||
    navLinks[0];
  setActiveLink(navLinks, initiallyActiveLink);
  bindMobileMenuInteractions(headerRoot, navLinks);

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", (event) => {
      const sectionId = normalizeHashToId(navLink.getAttribute("href"));
      if (!sectionId) {
        return;
      }

      const targetSection = document.getElementById(sectionId);
      if (!targetSection) {
        return;
      }

      event.preventDefault();
      setActiveLink(navLinks, navLink);
      scrollToSection(targetSection);
    });
  });

  const activateByScrollPosition = () => {
    const headerElement = document.querySelector(".site-header");
    const headerHeight = Math.max(0, headerElement?.offsetHeight || 0);
    const currentReferenceY = headerHeight + 20;

    let bestSection = observedSections[0];
    let bestDistance = Number.POSITIVE_INFINITY;

    observedSections.forEach((sectionElement) => {
      const rect = sectionElement.getBoundingClientRect();
      const distance = Math.abs(rect.top - currentReferenceY);

      if (distance < bestDistance) {
        bestDistance = distance;
        bestSection = sectionElement;
      }
    });

    const bestLink = sectionToLink.get(bestSection);
    if (bestLink) {
      setActiveLink(navLinks, bestLink);
    }
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) {
          return;
        }

        visibleEntries.sort((a, b) => {
          if (b.intersectionRatio !== a.intersectionRatio) {
            return b.intersectionRatio - a.intersectionRatio;
          }

          return (
            Math.abs(a.boundingClientRect.top) -
            Math.abs(b.boundingClientRect.top)
          );
        });

        const topSection = visibleEntries[0]?.target;
        const topLink = sectionToLink.get(topSection);
        if (topLink) {
          setActiveLink(navLinks, topLink);
        }
      },
      {
        root: null,
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    );

    observedSections.forEach((sectionElement) =>
      observer.observe(sectionElement),
    );
  } else {
    let ticking = false;

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) {
          return;
        }

        ticking = true;
        window.requestAnimationFrame(() => {
          activateByScrollPosition();
          ticking = false;
        });
      },
      { passive: true },
    );
  }

  return undefined;
}
