export class Navigation {
  constructor() {
    this.nav = document.querySelector(".header__nav ul");
    this.navItems = document.querySelectorAll(".header__nav-item");
    this.navShow = document.querySelector(".header__nav-show");
    this.navClose = document.querySelector(".header__nav-close");
    this.userActions = document.querySelector(".header__user-actions");
    this.init();
  }
  init() {
    this.navItems.forEach((nav) => {
      nav.addEventListener("click", (e) => {
        this.navItems.forEach((e) => {
          e.classList.remove("header__nav-item--active");
        });
        e.target.classList.add("header__nav-item--active");
      });
    });

    // tablet / movile only:
    this.navShow.addEventListener("click", (e) => {
      this.show(this.nav, true);
      this.show(this.navClose, true);
      this.show(this.userActions, true);
      this.show(e.target, false);
    });
    this.navClose.addEventListener("click", (e) => {
      this.show(this.nav, false);
      this.show(this.navShow, true);
      this.show(this.userActions, false);
      this.show(e.target, false);
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
