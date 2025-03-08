document.addEventListener("DOMContentLoaded", function () {
    // Menu toggle button (menu.svg)
    const menuButton = document.querySelector(".menu-button");
    // Mobile navigation overlay
    const mobileNav = document.querySelector(".mobile-nav");
    // Body element for toggling scrolling
    const body = document.body;
    
    // Toggle mobile menu open/close on click
    if (menuButton) {
      menuButton.addEventListener("click", function (e) {
        e.preventDefault();
        mobileNav.classList.toggle("active");
        body.classList.toggle("menu-open");
      });
    }
    
    // Handle submenu opening: for each nav item that has a submenu
    const navItemsWithSubmenu = document.querySelectorAll(".nav-item[data-has-submenu='true']");
    navItemsWithSubmenu.forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        // Get target submenu ID from data-target (e.g., "shop" yields "shop-submenu")
        const target = this.getAttribute("data-target");
        const submenu = document.getElementById(`${target}-submenu`);
        if (submenu) {
          // Close main menu and open the submenu overlay
          mobileNav.classList.remove("active");
          submenu.classList.add("active");
        }
      });
    });
    
    // Handle back button in each submenu overlay
    const submenuBackButtons = document.querySelectorAll(".submenu-overlay .back-button");
    submenuBackButtons.forEach(function (button) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const submenu = this.closest(".submenu-overlay");
        if (submenu) {
          submenu.classList.remove("active");
          // Optionally, re-open the main mobile nav after a brief delay
          setTimeout(function () {
            mobileNav.classList.add("active");
          }, 60);
        }
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    const closeButtons = document.querySelectorAll(".close-button");
    const mobileNav = document.querySelector(".mobile-nav");
    const submenuOverlays = document.querySelectorAll(".submenu-overlay");
    const body = document.body;
    
    closeButtons.forEach(button => {
      button.addEventListener("click", function(e) {
        e.preventDefault();
        // Close the main menu if open
        if(mobileNav && mobileNav.classList.contains("active")) {
          mobileNav.classList.remove("active");
        }
        // Close all submenu overlays
        submenuOverlays.forEach(submenu => {
          submenu.classList.remove("active");
        });
        // Remove the menu-open class to re-enable scrolling and remove overlays
        body.classList.remove("menu-open");
      });
    });
  });