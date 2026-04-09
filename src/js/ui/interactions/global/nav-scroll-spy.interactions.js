import { SCROLL_SPY_REFERENCE_GAP } from "./nav.constants.js";
import { getHeaderHeight, setActiveLink } from "./nav.helpers.js";

export function bindNavScrollSpy(navLinks, sectionToLink) {
  const observedSections = Array.from(sectionToLink.keys());
  if (observedSections.length === 0) {
    return;
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
}
