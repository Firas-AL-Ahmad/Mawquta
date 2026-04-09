import { renderQibla } from "../components/qibla/qibla-visual.component.js";
import { renderQiblaCardHead } from "../components/qibla/qibla-card-head.component.js";
import { renderQiblaCityModal } from "../components/qibla/qibla-city-modal.component.js";
import { renderSectionDivider } from "../components/section/section-divider.component.js";

export function renderQiblaSection(rootElement, viewModel = {}) {
  void viewModel;

  if (!rootElement) {
    return null;
  }

  const modalId = "qiblaCityModal";
  const modalLabelId = "qiblaCityModalTitle";

  rootElement.innerHTML = `
    <section class="qibla-sec" id="qibla" aria-label="اتجاه القبلة">
      <div class="container-xl">
        <div class="qibla-card">
          ${renderQiblaCardHead(modalId)}

          ${renderQibla()}
        </div>
      </div>

      ${renderQiblaCityModal({ modalId, modalLabelId })}
    </section>

    ${renderSectionDivider()}
  `;

  return rootElement;
}