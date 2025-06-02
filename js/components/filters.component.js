export class FiltersBehaviors {
  constructor() {
    this.filters = document.querySelector('[data-id="filters"]');
    this.blocks = this.filters.querySelectorAll('[data-id="filters__block"]');
    this.close = this.filters.querySelector('[data-id="filters__close"]');
    this.showFilters = document.querySelector('[data-id="show-filters"]');
    this.init();
  }

  init() {
    // Accordion:
    this.blocks.forEach((block) => {
      const filter = block.querySelector('[data-id="filters__item"]');
      filter.addEventListener("click", () => {
        block.classList.toggle("active");
      });
    });

    // (tablet / movile only) View all / view less:
    this.blocks.forEach((block) => {
      const viewAll = block.querySelector('[data-id="filters__view-all"]');
      const viewLess = block.querySelector('[data-id="filters__view-less"]');
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
      this.show(this.filters, false);
      this.show(this.showFilters, true);
    });

    // Show filters:
    this.showFilters.addEventListener("click", (e) => {
      this.show(this.filters, true);
      this.show(this.showFilters, false);
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

export class FiltersActions {
  constructor() {
    this.filters = document.querySelectorAll("[data-action]");
    this.listItems = document.querySelectorAll("[data-destination]");
    this.blocks = document.querySelectorAll('[data-id="results__block"]');

    this.activeFilters = [];
    this.init();
  }
  init() {
    this.filters.forEach((item) => {
      item.addEventListener("click", (e) => {
        const action = e.target.dataset.action;
        if (e.target.checked) {
          //check filter item
          this.activeFilters.push(action);
        } else {
          this.activeFilters = this.activeFilters.filter((f) => f !== action);
          //uncheck filter item
        }
        this.applyFilterDestinationOnResults();
      });
    });
  }

  applyFilterDestinationOnResults() {
    this.listItems.forEach((e) => {
      e.classList.remove("hide");
      if (this.activeFilters.length === 0) return;
      if (!this.activeFilters.includes(e.dataset.destination)) {
        e.classList.add("hide");
      }
    });
    this.hideEmptyBlocks();
  }

  hideEmptyBlocks() {
    this.blocks.forEach((e) => {
      e.classList.remove('hide')
      if(e.querySelectorAll("[data-destination]:not(.hide)").length === 0){
        e.classList.add('hide')
      }
    });
  }
}
