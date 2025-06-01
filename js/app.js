import { Carousel } from "./components/carousel.component.js";
import { Filters } from "./components/filters.component.js";
import { Navigation } from "./components/navigation.component.js";
import { Breakdown } from "./components/result-card.component.js";

document.addEventListener("DOMContentLoaded", function () {
  // inicialize carousel:
  const carouselElement = document.querySelector('[data-id="carousel__frame"]');
  if (carouselElement) {
    new Carousel(carouselElement);
  }

  // inicialize navigation:
  new Navigation();

  // initialize filters:
  new Filters();

  // inicialize carousel:
  new Breakdown();
});
