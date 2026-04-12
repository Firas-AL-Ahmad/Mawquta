import { renderSectionHeadChip } from "./section-head-chip.component.js";

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

function resolveEyebrowIconClassName(eyebrowClassName = "") {
  if (typeof eyebrowClassName !== "string" || eyebrowClassName.length === 0) {
    return "section-city__eyebrow-icon";
  }

  const sectionSpecificIconClassName = eyebrowClassName.includes("__eyebrow")
    ? eyebrowClassName.replace("__eyebrow", "__eyebrow-icon")
    : "";

  return ["section-city__eyebrow-icon", sectionSpecificIconClassName]
    .filter(Boolean)
    .join(" ");
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
        ${renderSectionHeadChip({
          tagName: "div",
          rootClassName: ["section-city__eyebrow", eyebrowClassName]
            .filter(Boolean)
            .join(" "),
          text: eyebrowText,
          iconType: "decorative",
          iconClassName: resolveEyebrowIconClassName(eyebrowClassName),
        })}
        <h2 class="section-city__name ${cityTitleClassName} section-head__title" ${cityDataAttribute}>${cityName}</h2>
        ${renderSectionMeta(meta)}
      </div>
      <span class="section-badge ${badgeClassName} section-head__badge">${badgeText}</span>
    </div>
  `;
}

