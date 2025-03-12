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
document.addEventListener("DOMContentLoaded", function() {
  const heroVideo = document.querySelector('.hero-video__content');
  if (heroVideo) {
    // Force play the video (this may require it to be muted for autoplay to work)
    heroVideo.play().catch(function(error) {
      console.error("Error playing the video:", error);
    });
  }
});
document.addEventListener("DOMContentLoaded", function() {
  if (window.innerWidth <= 768) {
    const track = document.querySelector('.collection-track');
    const slides = document.querySelectorAll('.collection-slide');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalSlides = slides.length; // 3

    function updateSlider(index) {
      // Each slide is effectively 80% + 5% margin = ~85% shift per slide
      track.style.transform = `translateX(-${index * 85}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index);
        currentIndex = idx;
        updateSlider(currentIndex);
      });
    });

    // init
    updateSlider(currentIndex);
  }
});
