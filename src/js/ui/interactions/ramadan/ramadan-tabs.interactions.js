export function bindRamadanTabsInteractions(rootElement = document) {
  const tabButtons = rootElement.querySelectorAll("[data-ramadan-tab]");
  if (!tabButtons.length) {
    return;
  }

  tabButtons.forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      tabButtons.forEach((node) => {
        node.classList.remove("r-tab--active");
        node.setAttribute("aria-selected", "false");
      });

      buttonElement.classList.add("r-tab--active");
      buttonElement.setAttribute("aria-selected", "true");
    });
  });
}