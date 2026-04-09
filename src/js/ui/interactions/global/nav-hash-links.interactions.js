import { scrollToSection, setActiveLink, toSectionFromLink } from "./nav.helpers.js";

export function bindHeaderHashLinkInteractions({
  headerHashLinks,
  navLinks,
  mobileMenu,
}) {
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
}
