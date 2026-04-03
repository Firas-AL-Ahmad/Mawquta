const NAV_LINK_SELECTOR = ".site-header__nav .site-header__link[href^='#']";
const HEADER_HASH_LINK_SELECTOR = ".site-header a[href^='#']";
const ACTIVE_CLASS = "site-header__link--active";
const ACTIVE_BOOTSTRAP_CLASS = "active";
const MOBILE_MEDIA_QUERY = "(max-width: 991.98px)";
const MOBILE_FALLBACK_WIDTH = 992;
const SCROLL_OFFSET_GAP = 8;
const SCROLL_SPY_REFERENCE_GAP = 20;
const COLLAPSE_SCROLL_FALLBACK_MS = 260;
const LANG_DROPDOWN_SELECTOR = "[data-lang-dropdown]";
const LANG_TRIGGER_SELECTOR = "[data-lang-trigger]";
const LANG_MENU_SELECTOR = "[data-lang-menu]";
const LANG_OPTION_SELECTOR = "[data-lang-option]";

function bindLanguageDropdown(headerRoot) {
  const langDropdown = headerRoot.querySelector(LANG_DROPDOWN_SELECTOR);
  if (!(langDropdown instanceof HTMLElement)) {
    return;
  }

  const triggerButton = langDropdown.querySelector(LANG_TRIGGER_SELECTOR);
  const menuElement = langDropdown.querySelector(LANG_MENU_SELECTOR);
  const optionButtons = Array.from(
    langDropdown.querySelectorAll(LANG_OPTION_SELECTOR),
  );
  const triggerLabel = triggerButton?.querySelector("[data-lang-label]");
  const triggerCode = triggerButton?.querySelector("[data-lang-code]");
  const triggerFlag = triggerButton?.querySelector("[data-lang-flag]");

  if (
    !(triggerButton instanceof HTMLButtonElement) ||
    !(menuElement instanceof HTMLElement) ||
    optionButtons.length === 0
  ) {
    return;
  }

  const setOpenState = (isOpen) => {
    triggerButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuElement.hidden = !isOpen;
    langDropdown.classList.toggle("is-open", isOpen);
  };

  const closeMenu = () => setOpenState(false);

  triggerButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isExpanded = triggerButton.getAttribute("aria-expanded") === "true";
    setOpenState(!isExpanded);
  });

  optionButtons.forEach((optionButton) => {
    optionButton.addEventListener("click", (event) => {
      event.preventDefault();

      optionButtons.forEach((buttonElement) => {
        buttonElement.classList.remove("is-selected");
        buttonElement.setAttribute("aria-selected", "false");
      });

      optionButton.classList.add("is-selected");
      optionButton.setAttribute("aria-selected", "true");

      const selectedLabel = optionButton.getAttribute("data-lang-label");
      const selectedCode = optionButton.getAttribute("data-lang-code");
      const selectedFlag = optionButton.getAttribute("data-lang-flag");

      if (triggerLabel && selectedLabel) {
        triggerLabel.textContent = selectedLabel;
      }

      if (triggerCode && selectedCode) {
        triggerCode.textContent = selectedCode;
      }

      if (triggerFlag instanceof HTMLImageElement && selectedFlag) {
        triggerFlag.src = selectedFlag;
      }

      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    const eventTarget = event.target;
    if (!(eventTarget instanceof Node)) {
      return;
    }

    if (!langDropdown.contains(eventTarget)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

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
  const navElement = headerRoot.querySelector(".site-header__nav");
  const usesBootstrapPanel =
    panelElement instanceof HTMLElement &&
    panelElement.classList.contains("collapse");
  const menuContainer = usesBootstrapPanel ? panelElement : navElement;

  if (!menuToggleButton || !(menuContainer instanceof HTMLElement)) {
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

  const syncHeaderOffset = () => {
    const headerHeight = `${getHeaderHeight()}px`;
    headerRoot.style.setProperty("--header-offset", headerHeight);
    document.documentElement.style.setProperty(
      "--app-header-height",
      headerHeight,
    );
  };

  const bootstrapCollapse =
    usesBootstrapPanel && window.bootstrap?.Collapse
      ? window.bootstrap.Collapse.getOrCreateInstance(menuContainer, {
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
    menuContainer.classList.remove("show", "is-open");
    menuToggleButton.focus({ preventScroll: true });
  };

  if (!bootstrapCollapse) {
    menuToggleButton.addEventListener("click", (event) => {
      event.preventDefault();
      syncHeaderOffset();

      const isExpanded =
        menuToggleButton.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        menuToggleButton.setAttribute("aria-expanded", "true");
        menuContainer.classList.add("is-open");
        const firstLink = menuContainer.querySelector(".site-header__link");
        if (firstLink instanceof HTMLElement) {
          firstLink.focus({ preventScroll: true });
        }
      }
    });
  } else {
    menuContainer.addEventListener("shown.bs.collapse", () => {
      menuToggleButton.setAttribute("aria-expanded", "true");
    });

    menuContainer.addEventListener("hidden.bs.collapse", () => {
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
      } else {
        syncHeaderOffset();
      }
    });
  }

  window.addEventListener("resize", syncHeaderOffset, { passive: true });
  syncHeaderOffset();

  const closeThen = (callback) => {
    const isOpen = bootstrapCollapse
      ? menuContainer.classList.contains("show")
      : menuContainer.classList.contains("is-open");

    if (!isOpen) {
      callback?.();
      return;
    }

    if (!bootstrapCollapse) {
      closeMenu();
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

    menuContainer.addEventListener("hidden.bs.collapse", runOnce, {
      once: true,
    });

    closeMenu();
    window.setTimeout(runOnce, COLLAPSE_SCROLL_FALLBACK_MS);
  };

  return {
    isMobileViewport,
    isPanelOpen: () =>
      bootstrapCollapse
        ? menuContainer.classList.contains("show")
        : menuContainer.classList.contains("is-open"),
    closeMenu,
    closeThen,
  };
}

export function bindNavInteractions(headerRoot = document) {
  if (!headerRoot) {
    return undefined;
  }

  bindLanguageDropdown(headerRoot);

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
