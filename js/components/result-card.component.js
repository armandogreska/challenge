export class Breakdown {
  constructor() {
    this.cards = document.querySelectorAll('[data-id="result-card"]');
    this.init();
  }

  init() {
    this.cards.forEach((card) => {
      const breakdownBtn = card.querySelector('[data-id="price__breakdown"]');
      const breakdownLayer = card.querySelector('[data-id="break-layer"]');
      const close = breakdownLayer.querySelector('[data-id="break-layer__close"]');

      breakdownBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.hideAllBreakdownLayers();
        breakdownLayer.classList.remove("hide");
      });

      close.addEventListener("click", () =>
        breakdownLayer.classList.add("hide")
      );
    });
  }

  hideAllBreakdownLayers() {
    document.querySelectorAll('[data-id="break-layer"]').forEach((layer) => {
      layer.classList.add("hide");
    });
  }
}
