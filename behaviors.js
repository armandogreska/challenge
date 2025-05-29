// filtros:
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".filter").forEach((filter) => {
    const block = filter.parentElement;
    filter.addEventListener("click", () => {
      block.classList.toggle("active");
    });
  });
});
