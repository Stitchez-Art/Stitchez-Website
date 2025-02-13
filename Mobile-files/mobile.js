document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;

  // Toggle main menu
  menuToggle.addEventListener("click", function (e) {
    e.preventDefault();

    // If menu is open, close everything
    if (this.classList.contains("active")) {
      this.classList.remove("active");
      mobileNav.classList.remove("active");
      document.querySelectorAll(".submenu-overlay").forEach(submenu => {
        submenu.classList.remove("active");
      });
      body.classList.remove("menu-open");
    } else {
      // If menu is closed, reset and open it
      this.classList.add("active");
      mobileNav.classList.add("active");
      body.classList.add("menu-open");

      // Reset submenu states
      document.querySelectorAll(".submenu-overlay").forEach(submenu => {
        submenu.classList.remove("active");
      });
    }
  });

  // Submenu handling
  document.querySelectorAll(".nav-item[data-has-submenu='true']").forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.dataset.target;
      const submenu = document.getElementById(`${target}-submenu`);

      // Hide main menu and show submenu
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
  document.querySelectorAll(".back-button").forEach(button => {
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
      menuToggle.classList.remove("active");
      mobileNav.classList.remove("active");
      document.querySelectorAll(".submenu-overlay").forEach(submenu => {
        submenu.classList.remove("active");
      });
      body.classList.remove("menu-open");
    }
  });
});