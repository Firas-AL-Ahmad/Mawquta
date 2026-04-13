function resolveTagName(tagName) {
  if (typeof tagName !== "string") {
    return "span";
  }

  const normalizedTagName = tagName.trim().toLowerCase();
  return normalizedTagName || "span";
}

function escapeHtmlAttributeValue(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderRootAttributes(rootAttributes = {}) {
  if (!rootAttributes || typeof rootAttributes !== "object") {
    return "";
  }

  return Object.entries(rootAttributes)
    .filter(([, value]) => value !== null && value !== undefined && value !== false)
    .map(([attributeName, value]) => {
      if (value === true) {
        return ` ${attributeName}`;
      }

      return ` ${attributeName}="${escapeHtmlAttributeValue(value)}"`;
    })
    .join("");
}

function renderSectionHeadChipIcon({
  iconType,
  iconClassName,
  iconSrc,
  iconAlt,
}) {
  const normalizedIconClassName = iconClassName || "";

  if (iconType === "image") {
    return `<img class="section-head-chip__icon section-head__icon ${normalizedIconClassName}" src="${iconSrc}" alt="${iconAlt}" loading="lazy" decoding="async" />`;
  }

  return `<span class="section-head-chip__icon section-head__icon ${normalizedIconClassName}" aria-hidden="true"></span>`;
}

export function renderSectionHeadChip({
  tagName = "span",
  rootClassName = "",
  rootAttributes = {},
  text = "",
  textClassName = "",
  textAttributes = {},
  iconType = "decorative",
  iconClassName = "",
  iconSrc = "",
  iconAlt = "",
}) {
  const resolvedTagName = resolveTagName(tagName);
  const resolvedRootClassName = rootClassName ? ` ${rootClassName}` : "";
  const resolvedRootAttributes = renderRootAttributes(rootAttributes);
  const resolvedTextClassName = textClassName ? ` ${textClassName}` : "";
  const resolvedTextAttributes = renderRootAttributes(textAttributes);

  return `
    <${resolvedTagName} class="section-head-chip${resolvedRootClassName}"${resolvedRootAttributes}>
      ${renderSectionHeadChipIcon({
        iconType,
        iconClassName,
        iconSrc,
        iconAlt,
      })}
      <span class="section-head-chip__text${resolvedTextClassName}"${resolvedTextAttributes}>${text}</span>
    </${resolvedTagName}>
  `;
}
