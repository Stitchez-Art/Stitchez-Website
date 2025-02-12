document.addEventListener("DOMContentLoaded", function() {
  // Toggle main mobile navigation overlay
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  
  menuToggle.addEventListener("click", function() {
    this.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });

  // Toggle submenus for nav items that have submenus
  const submenuTriggers = document.querySelectorAll(".nav-item[data-has-submenu='true']");
  submenuTriggers.forEach(item => {
    item.addEventListener("click", function(e) {
      // Prevent default if it's a clickable link
      e.preventDefault();
      // Hide main nav overlay
      mobileNav.classList.remove("active");
      menuToggle.classList.remove("active");
      // Get target submenu from data attribute
      const target = this.dataset.target;
      const submenuOverlay = document.getElementById(`${target}-submenu`);
      if (submenuOverlay) {
        submenuOverlay.classList.add("active");
      }
    });
  });

  // Back button functionality in submenu overlays
  const backButtons = document.querySelectorAll(".back-button");
  backButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Hide all submenu overlays
      document.querySelectorAll(".submenu-overlay").forEach(overlay => overlay.classList.remove("active"));
      // Show main mobile nav overlay again
      mobileNav.classList.add("active");
      menuToggle.classList.add("active");
    });
  });
});
