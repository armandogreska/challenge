export class Breakdown {
  constructor() {
    this.cards = document.querySelectorAll(".result__card");
    this.init();
  }

  init() {
    this.cards.forEach((card) => {
      const breakdownBtn = card.querySelector(".price__breakdown");
      const breakdownLayer = card.querySelector(".break-layer");
      const close = breakdownLayer.querySelector(".break-layer__close");

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
    document.querySelectorAll(".break-layer").forEach((layer) => {
      layer.classList.add("hide");
    });
  }
}
