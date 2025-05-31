import { Carousel } from "./carousel.js";

document.addEventListener("DOMContentLoaded", function () {
  // inicialize carousel:
  const carouselElement = document.querySelector(".carousel__frame");
  if (carouselElement) {
    new Carousel(carouselElement);
  }
  
  navigation();
  filters();
  breakdown();
});

// Navigation:
function navigation() {
  const nav = document.querySelector(".header__nav ul");
  const navItems = document.querySelectorAll(".header__nav-item");
  const navShow = document.querySelector(".header__nav-show");
  const navClose = document.querySelector(".header__nav-close");
  const userActions = document.querySelector(".header__user-actions");

  navItems.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      navItems.forEach((e) => {
        e.classList.remove("header__nav-item--active");
      });
      e.target.classList.add("header__nav-item--active");
    });
  });

  // tablet / movile only:
  navShow.addEventListener("click", (e) => {
    show(nav, true);
    show(navClose, true);
    show(userActions, true);
    show(e.target, false);
  });
  navClose.addEventListener("click", (e) => {
    show(nav, false);
    show(navShow, true);
    show(userActions, false);
    show(e.target, false);
  });
}

// Filters:
function filters() {
  const filters = document.querySelector(".filters");
  const blocks = filters.querySelectorAll(".filters__block");
  const close = filters.querySelector(".filters__close");
  const showFilters = document.querySelector(".show-filters");

  // Accordion:
  blocks.forEach((block) => {
    const filter = block.querySelector(".filters__item");
    filter.addEventListener("click", () => {
      block.classList.toggle("active");
    });
  });

  // (tablet / movile only) View all / view less:
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

  // Close filters:
  close.addEventListener("click", () => {
    show(filters, false);
    show(showFilters, true);
  });

  // Show filters:
  showFilters.addEventListener("click", (e) => {
    show(filters, true);
    show(showFilters, false);
  });
}

// Breakdown layer
function breakdown() {
  const cards = document.querySelectorAll(".result__card");

  cards.forEach((card) => {
    const breakdownBtn = card.querySelector(".price__breakdown");
    const breakdownLayer = card.querySelector(".break-layer");
    const close = breakdownLayer.querySelector(".break-layer__close");

    breakdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".break-layer").forEach((e) => {
        e.classList.add("hide");
      });
      breakdownLayer.classList.remove("hide");
    });
    close.addEventListener("click", () => breakdownLayer.classList.add("hide"));
  });
}

// Methods:
// Show/hidde animation:
function show(target, show) {
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
