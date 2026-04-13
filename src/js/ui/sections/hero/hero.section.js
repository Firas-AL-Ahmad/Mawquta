import { renderHeroDecorations } from "./components/hero-decorations.component.js";
import { renderHeroNextPrayerCard } from "./components/hero-next-prayer-card.component.js";
import { renderHeroInfoPanel } from "./components/hero-info-panel.component.js";
import { renderSectionDivider } from "../../shared/components/section/section-divider.component.js";

export function renderHeroSection(rootElement, sectionData = {}) {
  void sectionData;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="hero" id="hero" aria-label="قسم البطل">
      ${renderHeroDecorations()}

      <div class="hero__inner">
        <div class="hero__layout">
          <div class="hero__pane hero__pane--card">
            <div class="hero-left">
              ${renderHeroNextPrayerCard()}
            </div>
          </div>

          <div class="hero__pane hero__pane--content">
            ${renderHeroInfoPanel()}
          </div>
        </div>
      </div>
    </section>

    ${renderSectionDivider()}
  `;

  return rootElement;
}

export function updateHeroSectionLiveState(rootElement, updates = {}) {
  void updates;

  if (!rootElement) {
    return null;
  }

  return rootElement;
}
