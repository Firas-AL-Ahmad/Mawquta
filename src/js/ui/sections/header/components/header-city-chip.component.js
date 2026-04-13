import { renderSectionHeadChip } from "../../../shared/components/section/section-head-chip.component.js";

export function renderHeaderCityChip() {
  return renderSectionHeadChip({
    tagName: "button",
    rootClassName: "site-header__city",
    rootAttributes: {
      type: "button",
      "aria-label": "تغيير المدينة",
    },
    text: "دمشق، سوريا",
    textClassName: "site-header__city-text",
    iconType: "decorative",
    iconClassName: "site-header__city-icon",
  });
}
