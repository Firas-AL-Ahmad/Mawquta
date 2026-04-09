const DEFAULT_COUNTDOWN_PARTS = [
  { value: "01", unit: "Hr", valueDataAttribute: "data-hero-countdown-hours" },
  { value: "24", unit: "Min", valueDataAttribute: "data-hero-countdown-minutes" },
  { value: "45", unit: "Sec", valueDataAttribute: "data-hero-countdown-seconds" },
];

function renderCountdownPart(part) {
  return `
    <div class="countdown__item">
      <span class="countdown__val" ${part.valueDataAttribute}>${part.value}</span>
      <span class="countdown__unit">${part.unit}</span>
    </div>
  `;
}

export function renderHeroCountdown() {
  return `
    <section class="countdown" aria-live="polite" aria-label="الوقت المتبقي للصلاة القادمة">
      <p class="countdown__label" data-hero-countdown-label>الوقت المتبقي</p>

      <div class="countdown__grid" data-hero-countdown>
        ${DEFAULT_COUNTDOWN_PARTS.map((part, index) => {
          const partMarkup = renderCountdownPart(part);
          const separatorMarkup =
            index < DEFAULT_COUNTDOWN_PARTS.length - 1
              ? '<span class="countdown__sep" aria-hidden="true">:</span>'
              : "";

          return `${partMarkup}${separatorMarkup}`;
        }).join("\n")}
      </div>
    </section>
  `;
}
