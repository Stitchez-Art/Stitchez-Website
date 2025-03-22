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
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth >= 0) {
    const track = document.querySelector(".collection-track");
    const slides = document.querySelectorAll(".collection-slide");
    const dots = document.querySelectorAll(".dot");

    let currentIndex = 0;
    const totalSlides = slides.length;
    let startX = 0;
    let endX = 0;

    function updateSlider(index) {
      track.style.transform = `translateX(-${index * 85}%)`;
      console.log("Slider updated to index:", index);

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.dataset.index);
        console.log("Dot clicked, index:", idx);
        if (!isNaN(idx)) {
          currentIndex = idx;
          updateSlider(currentIndex);
        } else {
          console.error("data-index attribute missing on dot", dot);
        }
      });
    });

    // **Touch Events for Swipe Functionality**
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX; // Store touch start position
    });

    track.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX; // Store touch move position
    });

    track.addEventListener("touchend", () => {
      let swipeDistance = startX - endX; // Calculate swipe direction

      if (swipeDistance > 50) {
        // Swiped left (Next Slide)
        if (currentIndex < totalSlides - 1) {
          currentIndex++;
          updateSlider(currentIndex);
        }
      } else if (swipeDistance < -50) {
        // Swiped right (Previous Slide)
        if (currentIndex > 0) {
          currentIndex--;
          updateSlider(currentIndex);
        }
      }
    });

    // Initialize slider
    updateSlider(currentIndex);
  }
});

function updateMobileSliderHeight() {
  const viewportWidth = window.innerWidth;
  let minHeightValue;

  if (viewportWidth < 768) {
    // For small mobile devices: interpolate between 320px (300px height) and 414px (330px height)
    const x = Math.min(Math.max(viewportWidth, 320), 414);
    const slope = (330 - 300) / (414 - 320); // ~0.319 per px
    minHeightValue = 300 + slope * (x - 320);
  } else if (viewportWidth < 820) {
    // For tablets like iPad mini: between 768px and 820px, interpolate from 600px to 630px
    const x = Math.min(Math.max(viewportWidth, 768), 820);
    const slope = (630 - 600) / (820 - 768); // ~0.577 per px
    minHeightValue = 600 + slope * (x - 768);
  } else if (viewportWidth < 1024) {
    // For devices like iPad Air/iPad Pro: between 820px and 1024px, interpolate from 630px to 750px
    const x = Math.min(Math.max(viewportWidth, 820), 1024);
    const slope = (750 - 630) / (1024 - 820); // ~0.588 per px
    minHeightValue = 630 + slope * (x - 820);
  } else if (viewportWidth < 1400) {
    // For screens between 1024px and 1400px: interpolate from 750px to 950px
    const x = Math.min(Math.max(viewportWidth, 1024), 1400);
    const slope = (950 - 750) / (1400 - 1024); // ~0.223 per px
    minHeightValue = 750 + slope * (x - 1024);
  } else if (viewportWidth > 1400) {
    // For screens between 1400px and 1920px: interpolate from 950px to 1150px
    const x = Math.min(Math.max(viewportWidth, 1400), 1920);
    const slope = (900 - 950) / (1920 - 1905); // ~0.3846 per px
    minHeightValue = 950 + slope * (x - 1400);
  } else {
    // For screens larger than 1920px, use a constant height
    minHeightValue = 1000;
  }

  const slider = document.querySelector('.mobile-collection-slider');
  if (slider) {
    slider.style.minHeight = `${minHeightValue}px`;
  }
}

// Run function on page load and window resize
window.addEventListener("load", updateMobileSliderHeight);
window.addEventListener("resize", updateMobileSliderHeight);
document.addEventListener("DOMContentLoaded", updateMobileSliderHeight);
