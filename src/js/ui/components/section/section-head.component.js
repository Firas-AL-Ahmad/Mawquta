function renderSectionMeta(metaConfig = {}) {
  if (metaConfig.mode === "paired") {
    return `
      <span class="${metaConfig.className}">
        <span class="${metaConfig.valueClassName}">${metaConfig.valueText}</span>
        <span class="${metaConfig.prefixClassName}">${metaConfig.prefixText}</span>
      </span>
    `;
  }

  return `<span class="${metaConfig.className}">${metaConfig.text}</span>`;
}

export function renderSectionHeadWithCity({
  headClassName,
  cityWrapperClassName,
  eyebrowClassName,
  cityTitleClassName,
  cityDataAttribute,
  cityName,
  meta,
  badgeClassName,
  badgeText,
  eyebrowText = "مواقيت الصلاة في",
}) {
  return `
    <div class="sec-head ${headClassName}">
      <div class="sec-city ${cityWrapperClassName} sec-head__main">
        <div class="sec-city__eyebrow ${eyebrowClassName}">
          <span class="sec-city__eyebrow-icon sec-head__icon" aria-hidden="true"></span>
          <span>${eyebrowText}</span>
        </div>
        <h2 class="sec-city__name ${cityTitleClassName} sec-head__title" ${cityDataAttribute}>${cityName}</h2>
        ${renderSectionMeta(meta)}
      </div>
      <span class="sec-badge ${badgeClassName} sec-head__badge">${badgeText}</span>
    </div>
  `;
}
