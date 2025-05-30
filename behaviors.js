// filtros:
document.addEventListener("DOMContentLoaded", function () {
  filters();
  breakdown();
});

// Filters:
function filters() {
  const filters = document.querySelector(".filters");
  const blocks = filters.querySelectorAll(".filters__block");

  // accordion:
  blocks.forEach((block) => {
    const filter = block.querySelector(".filters__item");
    filter.addEventListener("click", () => {
      block.classList.toggle("active");
    });
  });

  // view all / view less:
  blocks.forEach((block) => {
    const viewAll = block.querySelector(".filters__view-all");
    const viewLess = block.querySelector(".filters__view-less");
    const listItems = block.querySelectorAll(".filters__list li");
    const maxVisibleItems = 5;
    const hiddenItems = Array.from(listItems).slice(maxVisibleItems);

    if (!!listItems && listItems.length > maxVisibleItems) {
      listItems.forEach((item, i) => {
        if (i >= maxVisibleItems) {
          item.classList.add("hide");
        }
      });
      viewAll.querySelector("span").textContent = hiddenItems.length;
      viewAll.classList.remove("hide");
      viewAll.addEventListener("click", (e) => {
        e.currentTarget.classList.add("hide");
        viewLess.classList.remove("hide");
        hiddenItems.forEach((item) => item.classList.remove("hide"));
      });
      viewLess.addEventListener("click", (e) => {
        e.currentTarget.classList.add("hide");
        viewAll.classList.remove("hide");
        hiddenItems.forEach((item) => item.classList.add("hide"));
      });
    }
  });
}

// breakdown layer
function breakdown() {
  const cards = document.querySelectorAll(".result__card");

  cards.forEach((card) => {
    const breakdownBtn = card.querySelector(".price__breakdown");
    const breakdownLayer = card.querySelector(".break-layer");
    const close = breakdownLayer.querySelector(".break-layer__close");

    breakdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".break-layer")
        .forEach((e) => e.classList.add("hide"));
      breakdownLayer.classList.remove("hide");
    });
    close.addEventListener("click", () => breakdownLayer.classList.add("hide"));
  });
}
