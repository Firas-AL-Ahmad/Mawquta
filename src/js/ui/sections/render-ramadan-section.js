const DEFAULT_RAMADAN_SECTION_DATA = {
  state: "unavailable",
  dayText: "اليوم الرمضاني غير متاح حالياً",
  imsakText: "--:--",
  iftarText: "--:--",
  note: "تعذر تحميل بيانات رمضان حالياً.",
};

function resolveRamadanState(state) {
  if (
    state === "loading" ||
    state === "ready" ||
    state === "partial" ||
    state === "unavailable"
  ) {
    return state;
  }

  return DEFAULT_RAMADAN_SECTION_DATA.state;
}

function toRamadanSectionViewModel(inputData) {
  if (!inputData || typeof inputData !== "object") {
    return { ...DEFAULT_RAMADAN_SECTION_DATA };
  }

  const state = resolveRamadanState(inputData.state);

  const dayText =
    typeof inputData.dayText === "string" && inputData.dayText.trim().length > 0
      ? inputData.dayText.trim()
      : DEFAULT_RAMADAN_SECTION_DATA.dayText;

  const imsakText =
    typeof inputData.imsakText === "string" &&
    inputData.imsakText.trim().length > 0
      ? inputData.imsakText.trim()
      : DEFAULT_RAMADAN_SECTION_DATA.imsakText;

  const iftarText =
    typeof inputData.iftarText === "string" &&
    inputData.iftarText.trim().length > 0
      ? inputData.iftarText.trim()
      : DEFAULT_RAMADAN_SECTION_DATA.iftarText;

  const note =
    typeof inputData.note === "string" && inputData.note.trim().length > 0
      ? inputData.note.trim()
      : DEFAULT_RAMADAN_SECTION_DATA.note;

  return {
    state,
    dayText,
    imsakText,
    iftarText,
    note,
  };
}

export function renderRamadanSection(rootElement, data) {
  if (!rootElement) {
    return null;
  }

  const viewModel = toRamadanSectionViewModel(data);

  rootElement.innerHTML = `
    <div class="ramadan-section__inner container">
      <div class="ramadan-section__intro">
        <div class="section-heading ramadan-section__heading">
          <p class="section-heading__eyebrow">رمضان</p>
          <h2 class="section-heading__title">ملخص هادئ وواضح لمعلومات رمضان</h2>
          <p class="section-heading__subtitle">
            ملخص يومي مختصر يعرض اليوم الرمضاني ووقتَي الإمساك والإفطار حسب المدينة المختارة.
          </p>
        </div>
      </div>

      <div class="ramadan-section__body">
        <article class="card ramadan-card ramadan-card--${viewModel.state}" aria-label="ملخص رمضان">
          <div class="ramadan-card__content">
            <p class="ramadan-card__label">اليوم الرمضاني</p>
            <h3 class="ramadan-card__day">${viewModel.dayText}</h3>
            <p class="ramadan-card__note ramadan-card__note--${viewModel.state}">
              ${viewModel.note}
            </p>
          </div>

          <div class="ramadan-card__meta">
            <div class="ramadan-card__meta-item">
              <span class="ramadan-card__meta-label">الإمساك</span>
              <span class="ramadan-card__meta-value">${viewModel.imsakText}</span>
            </div>

            <div class="ramadan-card__meta-item">
              <span class="ramadan-card__meta-label">الإفطار</span>
              <span class="ramadan-card__meta-value">${viewModel.iftarText}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;

  return rootElement;
}
