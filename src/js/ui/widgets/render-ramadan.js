const DEFAULT_TODAY = {
  monthLabel: "رمضان 2026",
  dayLabel: "اليوم 15",
  imsakText: "04:12",
  iftarText: "18:42",
  countdown: { hours: "02", minutes: "16", seconds: "44" },
  progress: 77,
};

const DEFAULT_MONTH_ROWS = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1;
  const current = day === 15;
  return {
    number: day,
    dayName: [
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
      "الأحد",
    ][index % 7],
    date: `${String(day).padStart(2, "0")}/03`,
    imsak: `04:${String((12 + index) % 60).padStart(2, "0")}`,
    iftar: `18:${String((42 + index) % 60).padStart(2, "0")}`,
    today: current,
  };
});

function safeNum(value, fallback) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

export function renderRamadanCountdown(viewModel = {}) {
  const today = {
    ...DEFAULT_TODAY,
    ...viewModel,
    countdown: {
      ...DEFAULT_TODAY.countdown,
      ...(viewModel.countdown || {}),
    },
  };

  const progress = Math.max(
    0,
    Math.min(100, safeNum(today.progress, DEFAULT_TODAY.progress)),
  );

  return `
    <div class="rcard" id="ramadanTodayCard">
      <div class="rcard__times">
        <div class="rcard__time-block">
          <div class="rcard__time-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v6l4 2"/><circle cx="12" cy="12" r="9"/></svg>الإمساك</div>
          <div class="rcard__time-val" data-ramadan-imsak>${today.imsakText}</div>
        </div>
        <div class="rcard__time-block">
          <div class="rcard__time-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v6l4 2"/><circle cx="12" cy="12" r="9"/></svg>الإفطار</div>
          <div class="rcard__time-val" data-ramadan-iftar>${today.iftarText}</div>
        </div>
      </div>

      <div class="rcard__countdown">
        <div class="rcard__countdown-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3v6l4 2"/><circle cx="12" cy="12" r="9"/></svg>الوقت المتبقي للإفطار</div>
        <div class="rcd-grid" data-ramadan-countdown>
          <div class="rcd-item"><span class="rcd-val">${today.countdown.hours}</span><span class="rcd-unit">HR</span></div>
          <span class="rcd-sep">:</span>
          <div class="rcd-item"><span class="rcd-val">${today.countdown.minutes}</span><span class="rcd-unit">MIN</span></div>
          <span class="rcd-sep">:</span>
          <div class="rcd-item"><span class="rcd-val">${today.countdown.seconds}</span><span class="rcd-unit">SEC</span></div>
        </div>
      </div>

      <div class="rcard__progress">
        <div class="rprog" aria-label="نسبة مرور اليوم">
          <div class="rprog__labels"><span>بداية اليوم</span><span>نهايته</span></div>
          <div class="rprog__bar"><div class="rprog__fill" style="width:${progress}%;"></div></div>
          <div class="rprog__pct">${progress}%</div>
        </div>
      </div>
    </div>
  `;
}

export function renderRamadanMonthTable(viewModel = {}) {
  const rows =
    Array.isArray(viewModel.rows) && viewModel.rows.length
      ? viewModel.rows
      : DEFAULT_MONTH_ROWS;
  const rangeText = viewModel.rangeText || "01 مارس – 30 مارس 2026";

  const rowMarkup = rows
    .map((row) => {
      const todayClass = row.today ? "row--today" : "";
      const todayPill = row.today
        ? '<span class="rt-today-pill">اليوم</span>'
        : "";
      return `
        <tr class="${todayClass}">
          <td class="td-num">${row.number}</td>
          <td class="td-day">${row.dayName}</td>
          <td class="td-date">${row.date}</td>
          <td>${row.imsak}</td>
          <td>${row.iftar}</td>
          <td>${todayPill}</td>
        </tr>
      `;
    })
    .join("");

  const mobileCardsMarkup = rows
    .map((row) => {
      const todayPill = row.today
        ? '<span class="rt-mobile-pill">اليوم</span>'
        : "";

      return `
        <article class="rt-mobile-card" aria-label="إمساكية ${row.dayName || "-"}">
          <div class="rt-mobile-head">
            <div>
              <h3 class="rt-mobile-title">اليوم ${row.number || "-"} - ${row.dayName || "-"}</h3>
              <span class="rt-mobile-date">${row.date || "-"}</span>
            </div>
            ${todayPill}
          </div>

          <dl class="rt-mobile-grid">
            <div class="rt-mobile-item"><dt>الإمساك</dt><dd>${row.imsak || "--:--"}</dd></div>
            <div class="rt-mobile-item rt-mobile-item--iftar"><dt>الإفطار</dt><dd>${row.iftar || "--:--"}</dd></div>
          </dl>
        </article>
      `;
    })
    .join("");

  return `
    <section class="ramadan-table-sec" aria-label="إمساكية شهر رمضان كاملة">
      <div class="ramadan-table-head">
        <div>
          <h2 class="ramadan-table-title">إمساكية شهر رمضان 🌙</h2>
          <p class="ramadan-table-sub">مواقيت الإمساك والإفطار لكل أيام شهر رمضان — <strong data-rt-city>دمشق، سوريا</strong></p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <button type="button" class="r-tab">تحميل PDF</button>
          <button type="button" class="r-tab">مشاركة</button>
        </div>
      </div>

      <div class="rt-card">
        <div class="rt-range">
          <span class="rt-range__icon" aria-hidden="true"></span>
          <span class="rt-range__text" data-rt-range>${rangeText}</span>
        </div>
        <div class="rt-wrap">
          <table class="rt-table" aria-label="إمساكية رمضان الكاملة">
            <thead>
              <tr>
                <th>اليوم</th>
                <th>الاسم</th>
                <th>التاريخ</th>
                <th>الإمساك</th>
                <th>الإفطار</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>${rowMarkup}</tbody>
          </table>
        </div>

        <div class="rt-mobile-list" aria-label="إمساكية رمضان - عرض الجوال">
          ${mobileCardsMarkup}
        </div>

        <div class="rt-more-btn">
          <button type="button" class="btn-more" data-rt-load-more>
            عرض المزيد
          </button>
        </div>
      </div>
    </section>
  `;
}
