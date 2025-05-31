document.addEventListener("DOMContentLoaded", function () {
  // inicialize carousel:
  const carouselElement = document.querySelector(".carousel__frame");
  if (carouselElement) {
    new Carousel(carouselElement);
  }
});

class Carousel {
  constructor(element) {
    this.carousel = element;
    this.slides = [...element.querySelectorAll(".carousel__slide")];
    this.currentIndex = 0;
    this.interval = null;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.startAutoPlay();
    this.update();
  }

  setupEventListeners() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dots = [...document.querySelectorAll(".carousel__dot")];

    prevBtn.addEventListener("click", () => this.prev());
    nextBtn.addEventListener("click", () => this.next());

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goTo(index));
    });

    // Touch events para móviles
    this.carousel.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.carousel.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      { passive: true }
    );

    // Pausar autoplay al interactuar
    this.carousel.addEventListener("mouseenter", () => this.pause());
    this.carousel.addEventListener("mouseleave", () => this.startAutoPlay());
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.update();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.update();
  }

  goTo(index) {
    this.currentIndex = index;
    this.update();
  }

  update() {
    this.carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    // Actualizar dots
    document.querySelectorAll(".carousel__dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
      dot.setAttribute(
        "aria-current",
        index === this.currentIndex ? "true" : "false"
      );
    });

    // Actualizar slides
    this.slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === this.currentIndex);
      slide.setAttribute(
        "aria-hidden",
        index !== this.currentIndex ? "true" : "false"
      );
    });
  }

  handleSwipe() {
    const threshold = 50;
    if (this.touchEndX < this.touchStartX - threshold) {
      this.next();
    } else if (this.touchEndX > this.touchStartX + threshold) {
      this.prev();
    }
  }

  startAutoPlay() {
    this.interval = setInterval(() => this.next(), 5000);
  }

  pause() {
    clearInterval(this.interval);
  }
}
