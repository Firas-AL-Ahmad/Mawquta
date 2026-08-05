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

/**
 * Updates the live state of the hero next-prayer card and countdown.
 * The hero consumes the Daily contract only; it never fetches on its own.
 *
 * Accepted updates:
 * - nextPrayerLabel (string)  -> [data-hero-next-prayer-label]
 * - nextPrayerTime  (string)  -> [data-hero-next-prayer-time]  (HH:MM)
 * - hours/minutes/seconds     -> the three [data-hero-countdown-*] values
 */
export function updateHeroSectionLiveState(rootElement, updates = {}) {
  if (!rootElement) {
    return null;
  }

  const {
    nextPrayerLabel,
    nextPrayerTime,
    hours,
    minutes,
    seconds,
  } = updates;

  const timeEl = rootElement.querySelector("[data-hero-next-prayer-time]");
  const labelEl = rootElement.querySelector("[data-hero-next-prayer-label]");
  const hoursEl = rootElement.querySelector("[data-hero-countdown-hours]");
  const minutesEl = rootElement.querySelector("[data-hero-countdown-minutes]");
  const secondsEl = rootElement.querySelector("[data-hero-countdown-seconds]");

  if (timeEl && nextPrayerTime != null) timeEl.textContent = nextPrayerTime;
  if (labelEl && nextPrayerLabel != null) labelEl.textContent = nextPrayerLabel;
  if (hoursEl && hours != null) hoursEl.textContent = hours;
  if (minutesEl && minutes != null) minutesEl.textContent = minutes;
  if (secondsEl && seconds != null) secondsEl.textContent = seconds;

  return rootElement;
}
