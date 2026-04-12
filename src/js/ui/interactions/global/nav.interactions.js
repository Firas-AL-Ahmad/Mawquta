import {
  HEADER_HASH_LINK_SELECTOR,
  NAV_LINK_SELECTOR,
} from "./nav.constants.js";
import { bindLanguageDropdown } from "./nav-language-dropdown.interactions.js";
import { createMobileMenuController } from "./nav-mobile-menu-controller.js";
import { bindHeaderHashLinkInteractions } from "./nav-hash-links.interactions.js";
import { bindNavScrollSpy } from "./nav-scroll-spy.interactions.js";
import { setActiveLink, toSectionFromLink } from "./nav.helpers.js";

function collectNavLinks(headerRoot) {
  return Array.from(headerRoot.querySelectorAll(NAV_LINK_SELECTOR));
}

function collectHeaderHashLinks(headerRoot) {
  return Array.from(headerRoot.querySelectorAll(HEADER_HASH_LINK_SELECTOR));
}

function initializeActiveNavLink(navLinks) {
  if (navLinks.length === 0) {
    return;
  }

  const initiallyActiveLink =
    navLinks.find((navLink) => navLink.classList.contains("site-header__link--active")) ||
    navLinks[0];

  setActiveLink(navLinks, initiallyActiveLink);
}

function mapSectionsToNavLinks(navLinks) {
  const sectionToLink = new Map();

  navLinks.forEach((navLink) => {
    const targetSection = toSectionFromLink(navLink);
    if (targetSection) {
      sectionToLink.set(targetSection, navLink);
    }
  });

  return sectionToLink;
}

export function bindNavInteractions(headerRoot = document) {
  if (!headerRoot) {
    return undefined;
  }

  bindLanguageDropdown(headerRoot);

  const navLinks = collectNavLinks(headerRoot);
  const headerHashLinks = collectHeaderHashLinks(headerRoot);

  if (navLinks.length === 0 && headerHashLinks.length === 0) {
    return undefined;
  }

  initializeActiveNavLink(navLinks);

  const mobileMenu = createMobileMenuController(headerRoot);
  bindHeaderHashLinkInteractions({
    headerHashLinks,
    navLinks,
    mobileMenu,
  });

  const sectionToLink = mapSectionsToNavLinks(navLinks);

  if (sectionToLink.size === 0) {
    return undefined;
  }

  bindNavScrollSpy(navLinks, sectionToLink);

  return undefined;
}
