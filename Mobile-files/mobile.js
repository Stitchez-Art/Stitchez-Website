document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;

  // Toggle main menu (opens from top to bottom)
  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
    mobileNav.classList.toggle("active");
    body.classList.toggle("menu-open");
  });

  // Submenu handling (blends in with the menu)
  document.querySelectorAll(".nav-item[data-has-submenu='true']").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.dataset.target;
      const submenu = document.getElementById(`${target}-submenu`);

      // Hide main menu and show submenu with blending effect
      mobileNav.style.transition = "opacity 0.3s ease";
      mobileNav.style.opacity = "0";

      setTimeout(() => {
        mobileNav.classList.remove("active");
        submenu.classList.add("active");
        mobileNav.style.transition = "";
      }, 300);
    });
  });

  // Back button handling
  document.querySelectorAll(".back-button").forEach((button) => {
    button.addEventListener("click", function () {
      const submenu = this.closest(".submenu-overlay");
      submenu.classList.remove("active");

      setTimeout(() => {
        mobileNav.style.opacity = "0";
        mobileNav.classList.add("active");
        setTimeout(() => (mobileNav.style.opacity = "1"), 50);
      }, 200);
    });
  });

  // Close menu on outside click
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".mobile-nav") &&
      !e.target.closest(".menu-toggle") &&
      !e.target.closest(".submenu-overlay")
    ) {
      mobileNav.classList.remove("active");
      menuToggle.classList.remove("active");
      document.querySelectorAll(".submenu-overlay").forEach((s) => s.classList.remove("active"));
      body.classList.remove("menu-open");
    }
  });
});