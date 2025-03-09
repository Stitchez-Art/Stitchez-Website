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

   /* -----------------------------
     EXPANDABLE SECTIONS
  ----------------------------- */
  const expandableHeaders = document.querySelectorAll('.expandable-header');
  expandableHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const isExpanded = header.getAttribute('data-expanded') === 'true';
      // Toggle attribute
      header.setAttribute('data-expanded', isExpanded ? 'false' : 'true');
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    const expandableHeaders = document.querySelectorAll('.expandable-header');
  
    expandableHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const content = header.nextElementSibling;
        const isExpanded = header.classList.contains('expanded');
        
        // When expanding, use a slower (longer) transition duration.
        if (!isExpanded) {
          header.style.setProperty('--transition-duration', '0.8s');
          header.classList.add('expanded');
        } else {
          // When collapsing, use a faster (shorter) transition duration.
          header.style.setProperty('--transition-duration', '0.5s');
          header.classList.remove('expanded');
        }
      });
    });
  });
  

  /* -----------------------------
     STITCHEZ STORY: READ MORE
  ----------------------------- */
  const readMoreButtons = document.querySelectorAll('.read-more-button');
  readMoreButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const hiddenText = btn.parentElement.querySelector('.hidden-text');
      if (!hiddenText) return;
      if (hiddenText.style.display === 'none' || hiddenText.style.display === '') {
        hiddenText.style.display = 'inline';
        btn.textContent = 'Read Less';
      } else {
        hiddenText.style.display = 'none';
        btn.textContent = 'Read More';
      }
    });
  });

  /* ----- OPTIONAL: Reset collection page to default "All Collection" on refresh ----- */
  window.addEventListener("beforeunload", function() {
    // Remove any hash from URL if needed.
    window.location.hash = "";
  });
});


const toggleButton = document.querySelector('.toggle-button');
// To activate:
toggleButton.classList.add('active');
// To deactivate:
toggleButton.classList.remove('active');
