import {
  ACTIVE_BOOTSTRAP_CLASS,
  ACTIVE_CLASS,
  SCROLL_OFFSET_GAP,
} from "./nav.constants.js";

export function toSectionFromLink(linkElement) {
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

export function setActiveLink(navLinks, activeLink) {
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

export function getHeaderHeight() {
  const headerElement = document.querySelector(".site-header");
  return Math.max(0, headerElement?.offsetHeight || 0);
}

export function scrollToSection(targetSection) {
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
