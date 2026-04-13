import { scrollToSection, setActiveLink, toSectionFromLink } from "./nav.helpers.js";

function shouldCloseMobileMenuBeforeScroll({ isNavLink, mobileMenu }) {
  return (
    isNavLink &&
    mobileMenu.isMobileViewport() &&
    mobileMenu.isPanelOpen()
  );
}

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

      if (shouldCloseMobileMenuBeforeScroll({ isNavLink, mobileMenu })) {
        mobileMenu.closeThen(() => scrollToSection(targetSection));
        return;
      }

      scrollToSection(targetSection);
    });
  });
}
