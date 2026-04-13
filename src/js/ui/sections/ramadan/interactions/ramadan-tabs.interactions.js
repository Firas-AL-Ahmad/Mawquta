function setTabSelectedState(tabButton, isActive) {
  tabButton.classList.toggle("ramadan-table-tab--active", isActive);
  tabButton.setAttribute("aria-selected", isActive ? "true" : "false");
}

export function bindRamadanTabsInteractions(rootElement = document) {
  const tabButtons = rootElement.querySelectorAll("[data-ramadan-tab]");
  if (!tabButtons.length) {
    return;
  }

  tabButtons.forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      tabButtons.forEach((tabButton) => {
        setTabSelectedState(tabButton, tabButton === buttonElement);
      });
    });
  });
}
