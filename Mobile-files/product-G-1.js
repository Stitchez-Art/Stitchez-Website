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
    /* ----- IMAGE SLIDER LOGIC ----- */
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const leftButton = document.querySelector('.arrow-left');
    const rightButton = document.querySelector('.arrow-right');
    const dots = document.querySelectorAll(".stitch-dots .dot");
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    function updateSlider(index) {
      sliderTrack.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => {
        dot.classList.toggle("active", parseInt(dot.dataset.index) === index);
      });
    }
    
    leftButton.addEventListener('click', function() {
      // Go to previous image, or loop to the last
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = totalSlides - 1;
      }
      updateSlider(currentIndex);
    });
    
    rightButton.addEventListener('click', function() {
      // Go to next image, or loop back to the first
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSlider(currentIndex);
    });
    
    // Initialize slider on page load
    updateSlider(currentIndex);
  

  // Dot navigation (large screens only)
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.index);
      currentIndex = idx;
      updateSlider(currentIndex);
    });
  });

  updateSlider(currentIndex);

  /* ----- VIDEO OVERLAY LOGIC ----- */
  const centerLogo = document.querySelector(".center-logo");
  const videoOverlay = document.getElementById("videoOverlay");
  const videoPlayer = document.getElementById("productVideo");
  const muteToggle = document.querySelector(".mute-toggle");
  const videoClose = document.querySelector(".video-close");

  centerLogo.addEventListener("click", () => {
    videoOverlay.style.display = "flex";
    videoPlayer.play();
  });

  muteToggle.addEventListener("click", () => {
    videoPlayer.muted = !videoPlayer.muted;
    muteToggle.textContent = videoPlayer.muted ? "Mute" : "Unmute";
  });

  videoClose.addEventListener("click", () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoOverlay.style.display = "none";
  });

  /* ----- EXPANDABLE SECTIONS ----- */
  const expandableHeaders = document.querySelectorAll(".expandable-header");
  expandableHeaders.forEach(header => {
    const content = header.nextElementSibling;
    header.addEventListener("click", () => {
      const expanded = header.getAttribute("data-expanded") === "true";
      header.setAttribute("data-expanded", !expanded);
      content.style.maxHeight = !expanded ? content.scrollHeight + "px" : "0px";
    });
  });

  /* ----- READ MORE / LESS FOR STORY ----- */
  const readMoreBtn = document.querySelector(".read-more-button");
  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", () => {
      const state = readMoreBtn.getAttribute("data-state");
      const hiddenText = document.querySelector(".hidden-text");
      if (state === "collapsed") {
        hiddenText.style.display = "block";
        readMoreBtn.textContent = "Read Less";
        readMoreBtn.setAttribute("data-state", "expanded");
      } else {
        hiddenText.style.display = "none";
        readMoreBtn.textContent = "Read More";
        readMoreBtn.setAttribute("data-state", "collapsed");
      }
    });
  }

  /* ----- OPTIONAL: Reset collection page to default "All Collection" on refresh ----- */
  window.addEventListener("beforeunload", function() {
    // Remove any hash from URL if needed.
    window.location.hash = "";
  });
});
