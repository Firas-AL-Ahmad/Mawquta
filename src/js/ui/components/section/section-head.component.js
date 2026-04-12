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
    <div class="section-head ${headClassName}">
      <div class="section-city ${cityWrapperClassName} section-head__main">
        <div class="section-city__eyebrow ${eyebrowClassName}">
          <span class="section-city__eyebrow-icon section-head__icon" aria-hidden="true"></span>
          <span>${eyebrowText}</span>
        </div>
        <h2 class="section-city__name ${cityTitleClassName} section-head__title" ${cityDataAttribute}>${cityName}</h2>
        ${renderSectionMeta(meta)}
      </div>
      <span class="section-badge ${badgeClassName} section-head__badge">${badgeText}</span>
    </div>
  `;
}

