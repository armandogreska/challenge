export class Filters {
  constructor() {
    this.filters = document.querySelector(".filters");
    this.blocks = this.filters.querySelectorAll(".filters__block");
    this.close = this.filters.querySelector(".filters__close");
    this.showFilters = document.querySelector(".show-filters");
    this.init();
  }

  init() {
    // Accordion:
    this.blocks.forEach((block) => {
      const filter = block.querySelector(".filters__item");
      filter.addEventListener("click", () => {
        block.classList.toggle("active");
      });
    });

    // (tablet / movile only) View all / view less:
    this.blocks.forEach((block) => {
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

    // Close filters:
    this.close.addEventListener("click", () => {
      show(this.filters, false);
      show(this.showFilters, true);
    });

    // Show filters:
    this.showFilters.addEventListener("click", (e) => {
      show(this.filters, true);
      show(this.showFilters, false);
    });
  }

  show(target, show) {
    if (show) {
      target.classList.remove("hide");
      target.style.opacity = "1";
      target.style.visibility = "visible";
    } else {
      target.style.opacity = "0";
      target.style.visibility = "hidden";
      setTimeout(() => target.classList.add("hide"), 0.5);
    }
  }
}
