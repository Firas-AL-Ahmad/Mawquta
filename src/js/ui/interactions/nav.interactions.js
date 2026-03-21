const NAV_LINK_SELECTOR = ".site-header__nav .site-header__link[href^='#']";
const HEADER_HASH_LINK_SELECTOR = ".site-header a[href^='#']";
const ACTIVE_CLASS = "site-header__link--active";
const ACTIVE_BOOTSTRAP_CLASS = "active";
const MOBILE_MEDIA_QUERY = "(max-width: 991.98px)";
const MOBILE_FALLBACK_WIDTH = 992;
const SCROLL_OFFSET_GAP = 8;
const SCROLL_SPY_REFERENCE_GAP = 20;
const COLLAPSE_SCROLL_FALLBACK_MS = 260;

function toSectionFromLink(linkElement) {
  const href = linkElement?.getAttribute("href");
  if (typeof href !== "string" || !href.startsWith("#")) {
    return null;
  }

  const sectionId = decodeURIComponent(href.slice(1)).trim();
  if (!sectionId) {
    return null;
  }

  return document.getElementById(sectionId);
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

function getHeaderHeight() {
  const headerElement = document.querySelector(".site-header");
  return Math.max(0, headerElement?.offsetHeight || 0);
}

function scrollToSection(targetSection) {
  if (!targetSection) {
    return;
  }

  const targetTop =
    window.scrollY +
    targetSection.getBoundingClientRect().top -
    getHeaderHeight() -
    SCROLL_OFFSET_GAP;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth",
  });
}

function createMobileMenuController(headerRoot) {
  const menuToggleButton = headerRoot.querySelector(
    ".site-header__menu-toggle",
  );
  const panelElement = headerRoot.querySelector(".site-header__panel");

  if (!menuToggleButton || !panelElement) {
    return {
      isMobileViewport: () => false,
      isPanelOpen: () => false,
      closeMenu: () => {},
      closeThen: (callback) => callback?.(),
    };
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
    if (mediaQueryList) {
      return Boolean(mediaQueryList.matches);
    }

    return window.innerWidth <= MOBILE_FALLBACK_WIDTH;
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
  } else {
    panelElement.addEventListener("shown.bs.collapse", () => {
      menuToggleButton.setAttribute("aria-expanded", "true");
    });

    panelElement.addEventListener("hidden.bs.collapse", () => {
      menuToggleButton.setAttribute("aria-expanded", "false");
    });
  }

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
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  if (mediaQueryList && typeof mediaQueryList.addEventListener === "function") {
    mediaQueryList.addEventListener("change", () => {
      if (!isMobileViewport()) {
        closeMenu();
      }
    });
  }

  const closeThen = (callback) => {
    if (!panelElement.classList.contains("show")) {
      callback?.();
      return;
    }

    let handled = false;
    const runOnce = () => {
      if (handled) {
        return;
      }

      handled = true;
      callback?.();
    };

    panelElement.addEventListener("hidden.bs.collapse", runOnce, {
      once: true,
    });

    closeMenu();
    window.setTimeout(runOnce, COLLAPSE_SCROLL_FALLBACK_MS);
  };

  return {
    isMobileViewport,
    isPanelOpen: () => panelElement.classList.contains("show"),
    closeMenu,
    closeThen,
  };
}

export function bindNavInteractions(headerRoot = document) {
  if (!headerRoot) {
    return undefined;
  }

  const navLinks = Array.from(headerRoot.querySelectorAll(NAV_LINK_SELECTOR));
  const headerHashLinks = Array.from(
    headerRoot.querySelectorAll(HEADER_HASH_LINK_SELECTOR),
  );

  if (navLinks.length === 0 && headerHashLinks.length === 0) {
    return undefined;
  }

  if (navLinks.length > 0) {
    const initiallyActiveLink =
      navLinks.find((navLink) => navLink.classList.contains(ACTIVE_CLASS)) ||
      navLinks[0];
    setActiveLink(navLinks, initiallyActiveLink);
  }

  const mobileMenu = createMobileMenuController(headerRoot);

  headerHashLinks.forEach((linkElement) => {
    linkElement.addEventListener("click", (event) => {
      const targetSection = toSectionFromLink(linkElement);
      if (!targetSection) {
        return;
      }

      event.preventDefault();

      const isNavLink = navLinks.includes(linkElement);
      if (isNavLink) {
        setActiveLink(navLinks, linkElement);
      }

      if (
        isNavLink &&
        mobileMenu.isMobileViewport() &&
        mobileMenu.isPanelOpen()
      ) {
        mobileMenu.closeThen(() => scrollToSection(targetSection));
        return;
      }

      scrollToSection(targetSection);
    });
  });

  const sectionToLink = new Map();
  navLinks.forEach((navLink) => {
    const targetSection = toSectionFromLink(navLink);
    if (targetSection) {
      sectionToLink.set(targetSection, navLink);
    }
  });

  const observedSections = Array.from(sectionToLink.keys());
  if (observedSections.length === 0) {
    return undefined;
  }

  let scrollTicking = false;
  const activateByScrollPosition = () => {
    const referenceY = getHeaderHeight() + SCROLL_SPY_REFERENCE_GAP;
    let closestSection = observedSections[0];
    let closestDistance = Number.POSITIVE_INFINITY;

    observedSections.forEach((sectionElement) => {
      const distance = Math.abs(
        sectionElement.getBoundingClientRect().top - referenceY,
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = sectionElement;
      }
    });

    const activeLink = sectionToLink.get(closestSection);
    if (activeLink) {
      setActiveLink(navLinks, activeLink);
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) {
        return;
      }

      scrollTicking = true;
      window.requestAnimationFrame(() => {
        activateByScrollPosition();
        scrollTicking = false;
      });
    },
    { passive: true },
  );

  return undefined;
}
