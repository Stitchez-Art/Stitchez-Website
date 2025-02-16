document.addEventListener("DOMContentLoaded", function () {
  // Main menu toggle logic
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;

  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      // If the menu is already active (open), then close everything
      if (menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active");
        mobileNav.classList.remove("active");
        body.classList.remove("menu-open");
        // Also, close any active submenu overlays
        const activeSubmenus = document.querySelectorAll(".submenu-overlay.active");
        activeSubmenus.forEach(submenu => submenu.classList.remove("active"));
      } else {
        // Otherwise, open the main menu normally
        menuToggle.classList.add("active");
        mobileNav.classList.add("active");
        body.classList.add("menu-open");
      }
    });
  }
  
  // Handle submenu opening:
  // For every nav item that has a submenu, attach a click event.
  const navItemsWithSubmenu = document.querySelectorAll(".nav-item[data-has-submenu='true']");
  navItemsWithSubmenu.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      // Get the target submenu ID from the data attribute (e.g., "shop" gives "shop-submenu")
      const target = this.getAttribute("data-target");
      const submenu = document.getElementById(`${target}-submenu`);
      if (submenu) {
        // Hide the main mobile nav
        mobileNav.classList.remove("active");
        // Show the submenu overlay (CSS will animate it)
        submenu.classList.add("active");
      }
    });
  });

  // Handle back button in each submenu overlay:
  const submenuBackButtons = document.querySelectorAll(".submenu-overlay .back-button");
  submenuBackButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      // Find the parent submenu overlay and remove its active class (this triggers the slide-out animation)
      const submenu = this.closest(".submenu-overlay");
      if (submenu) {
        submenu.classList.remove("active");
        // Optionally, bring back the main mobile nav after a slight delay if desired:
        setTimeout(() => {
          mobileNav.classList.add("active");
        }, 60);
      }
    });
  });
});
