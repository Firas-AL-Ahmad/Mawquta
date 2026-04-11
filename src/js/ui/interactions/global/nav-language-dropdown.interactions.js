import {
  LANG_DROPDOWN_SELECTOR,
  LANG_MENU_SELECTOR,
  LANG_OPTION_SELECTOR,
  LANG_TRIGGER_SELECTOR,
} from "./nav.constants.js";

function setOpenState({ triggerButton, menuElement, langDropdown }, isOpen) {
  triggerButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuElement.hidden = !isOpen;
  langDropdown.classList.toggle("is-open", isOpen);
}

function clearOptionSelection(optionButtons) {
  optionButtons.forEach((buttonElement) => {
    buttonElement.classList.remove("is-selected");
    buttonElement.setAttribute("aria-selected", "false");
  });
}

function applyOptionSelection(optionButton) {
  optionButton.classList.add("is-selected");
  optionButton.setAttribute("aria-selected", "true");
}

function updateTriggerContent({ triggerLabel, triggerCode, triggerFlag }, optionButton) {
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
}

export function bindLanguageDropdown(headerRoot) {
  const langDropdown = headerRoot.querySelector(LANG_DROPDOWN_SELECTOR);
  if (!(langDropdown instanceof HTMLElement)) {
    return;
  }

  const triggerButton = langDropdown.querySelector(LANG_TRIGGER_SELECTOR);
  const menuElement = langDropdown.querySelector(LANG_MENU_SELECTOR);
  const optionButtons = Array.from(langDropdown.querySelectorAll(LANG_OPTION_SELECTOR));
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

  const state = {
    triggerButton,
    menuElement,
    langDropdown,
  };

  const triggerParts = {
    triggerLabel,
    triggerCode,
    triggerFlag,
  };

  const closeMenu = () => setOpenState(state, false);

  triggerButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isExpanded = triggerButton.getAttribute("aria-expanded") === "true";
    setOpenState(state, !isExpanded);
  });

  optionButtons.forEach((optionButton) => {
    optionButton.addEventListener("click", (event) => {
      event.preventDefault();

      clearOptionSelection(optionButtons);
      applyOptionSelection(optionButton);
      updateTriggerContent(triggerParts, optionButton);

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
