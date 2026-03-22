import {
  renderRamadanCountdown,
  renderRamadanMonthTable,
} from "../widgets/render-ramadan.js";

const DEFAULT_RAMADAN_VIEW_MODEL = {
  monthLabel: "رمضان 2026",
  note: "آخر تحديث: عند تحميل الصفحة / الآن / وقت فعلي محفوظ",
  today: {
    dayLabel: "اليوم 15",
    imsakText: "04:12",
    iftarText: "18:42",
    countdown: { hours: "02", minutes: "16", seconds: "44" },
    progress: 77,
  },
  monthTable: {
    rangeText: "01 مارس – 30 مارس 2026",
  },
};

function normalizeRamadanViewModel(viewModel) {
  const model = viewModel && typeof viewModel === "object" ? viewModel : {};

  return {
    monthLabel:
      typeof model.monthLabel === "string" && model.monthLabel.trim()
        ? model.monthLabel.trim()
        : DEFAULT_RAMADAN_VIEW_MODEL.monthLabel,
    note:
      typeof model.note === "string" && model.note.trim()
        ? model.note.trim()
        : DEFAULT_RAMADAN_VIEW_MODEL.note,
    today:
      model.today && typeof model.today === "object"
        ? model.today
        : DEFAULT_RAMADAN_VIEW_MODEL.today,
    monthTable:
      model.monthTable && typeof model.monthTable === "object"
        ? model.monthTable
        : DEFAULT_RAMADAN_VIEW_MODEL.monthTable,
  };
}

export function renderRamadanSection(rootElement, data = DEFAULT_RAMADAN_VIEW_MODEL) {
  if (!rootElement) {
    return null;
  }

  const viewModel = normalizeRamadanViewModel(data);

  rootElement.innerHTML = `
    <section class="ramadan-sec" id="ramadan" aria-label="مواقيت رمضان">
      <div class="container-xl px-3 px-sm-4 px-lg-5">
        <div class="ramadan-head">
          <div class="ramadan-city">
            <div class="ramadan-eyebrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v6l4 2"/><circle cx="12" cy="12" r="9"/></svg>
              <span>شهر رمضان المبارك</span>
            </div>
            <h2 class="ramadan-month" data-ramadan-month>${viewModel.monthLabel}</h2>
            <span class="ramadan-meta">${viewModel.note}</span>
          </div>
          <span class="ramadan-badge">شهر رمضان</span>
        </div>

        <div class="ramadan-tabs" role="tablist">
          <button type="button" class="r-tab r-tab--active" role="tab" aria-selected="true" data-ramadan-tab="today">اليوم الحالي</button>
          <button type="button" class="r-tab" role="tab" aria-selected="false" data-ramadan-tab="week">إمساكية</button>
          <button type="button" class="r-tab" role="tab" aria-selected="false" data-ramadan-tab="month">شهرية</button>
        </div>

        ${renderRamadanCountdown(viewModel.today)}
      </div>
    </section>

    <hr class="sec-divider" />

    <div class="container-xl px-3 px-sm-4 px-lg-5">
      ${renderRamadanMonthTable(viewModel.monthTable)}
    </div>
  `;

  return rootElement;
}
