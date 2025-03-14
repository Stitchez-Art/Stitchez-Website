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


  document.addEventListener("DOMContentLoaded", function () {
   
  
    /********************************************************
     * 2) IMAGE SLIDER (CAROUSEL) LOGIC
     ********************************************************/
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const leftButton = document.querySelector('.arrow-left');
    const rightButton = document.querySelector('.arrow-right');
    const dots = document.querySelectorAll(".stitch-dots .dot");
    const totalSlides = 4;
    let currentIndex = 0;
  
    // Normal transition for sliding
    const slideTransitionNormal = "transform 0.8s ease";
    // Slower transition for wrapping
    const slideTransitionWrap = "transform 2s ease";
  
    // Set initial transition property
    if (sliderTrack) {
      sliderTrack.style.transition = slideTransitionNormal;
    }
  
    function updateSlider(index, disableTransition = false, useWrapTransition = false) {
      if (!sliderTrack) return;
      if (disableTransition) {
        sliderTrack.style.transition = "none";
      } else if (useWrapTransition) {
        sliderTrack.style.transition = slideTransitionWrap;
      } else {
        sliderTrack.style.transition = slideTransitionNormal;
      }
      sliderTrack.style.transform = `translateX(-${index * 100}%)`;
  
      // Update dot states
      dots.forEach(dot => {
        dot.classList.toggle("active", parseInt(dot.dataset.index) === index);
      });
    }
  
    // Left arrow
    if (leftButton) {
      leftButton.addEventListener('click', function() {
        if (currentIndex === 0) {
          // Wrap to last slide
          currentIndex = totalSlides - 1;
          updateSlider(currentIndex, true, true);
          setTimeout(() => {
            sliderTrack.style.transition = slideTransitionNormal;
          }, 50);
        } else {
          currentIndex--;
          updateSlider(currentIndex);
        }
      });
    }
  
    // Right arrow
    if (rightButton) {
      rightButton.addEventListener('click', function() {
        if (currentIndex === totalSlides - 1) {
          // Wrap to first slide
          currentIndex = 0;
          updateSlider(currentIndex, true, true);
          setTimeout(() => {
            sliderTrack.style.transition = slideTransitionNormal;
          }, 50);
        } else {
          currentIndex++;
          updateSlider(currentIndex);
        }
      });
    }
  
    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.dataset.index);
        currentIndex = idx;
        updateSlider(currentIndex);
      });
    });
  
    // Initialize slider
    updateSlider(currentIndex);
  
  
    /********************************************************
     * 3) VIDEO OVERLAY LOGIC
     ********************************************************/
    const centerLogo = document.querySelector(".center-logo");
    const videoOverlay = document.getElementById("videoOverlay");
    const videoPlayer = document.getElementById("productVideo");
    const muteToggle = document.querySelector(".mute-toggle");
    const videoClose = document.querySelector(".video-close");
  
    if (centerLogo && videoOverlay && videoPlayer) {
      centerLogo.addEventListener("click", () => {
        videoOverlay.style.display = "flex";
        videoPlayer.play();
      });
    }
  
    if (muteToggle && videoPlayer) {
      muteToggle.addEventListener("click", () => {
        videoPlayer.muted = !videoPlayer.muted;
        muteToggle.textContent = videoPlayer.muted ? "Mute" : "Unmute";
      });
    }
  
    if (videoClose && videoOverlay) {
      videoClose.addEventListener("click", () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoOverlay.style.display = "none";
      });
    }
  
  
    /********************************************************
     * 4) EXPANDABLE SECTIONS LOGIC
     ********************************************************/
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    expandableHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const isExpanded = header.getAttribute('data-expanded') === 'true';
        // Toggle the data-expanded attribute
        header.setAttribute('data-expanded', isExpanded ? 'false' : 'true');
      });
    });
  
    // Optional: Smoother open vs close durations
    // This can be done by adjusting the max-height transition in CSS
    // or toggling a class that changes the transition-duration.
  
  
    /********************************************************
     * 5) STITCHEZ STORY: READ MORE
     ********************************************************/
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
  
  });
  
  
  document.addEventListener("DOMContentLoaded", function() {
    // Only run slider logic on small screens
    if (window.innerWidth <= 768) {
      const sliderTrack = document.querySelector('.slider-track-small');
      const slides = document.querySelectorAll('.slider-track-small .slide');
      const leftButton = document.querySelector('.arrow-left');
      const rightButton = document.querySelector('.arrow-right');
      let currentIndex = 0;
      const totalSlides = slides.length;
      
      // Define transition styles
      const slideTransitionNormal = "transform 0.8s ease";
      const slideTransitionWrap = "transform 1s ease";
      
      // Set the initial transition
      if (sliderTrack) {
        sliderTrack.style.transition = slideTransitionNormal;
      }
      
      function updateSlider(index, disableTransition = false, useWrapTransition = false) {
        if (!sliderTrack) return;
        if (disableTransition) {
          sliderTrack.style.transition = "none";
        } else if (useWrapTransition) {
          sliderTrack.style.transition = slideTransitionWrap;
        } else {
          sliderTrack.style.transition = slideTransitionNormal;
        }
        sliderTrack.style.transform = `translateX(-${index * 100}%)`;
      }
      
      leftButton.addEventListener('click', function() {
        if (currentIndex === 0) {
          // When at the first slide, wrap to the last slide using wrap transition
          currentIndex = totalSlides - 1;
          updateSlider(currentIndex, true);
        } else {
          currentIndex--;
          updateSlider(currentIndex);
        }
      });
      
      rightButton.addEventListener('click', function() {
        if (currentIndex === totalSlides - 1) {
          // When at the last slide, wrap to the first slide using wrap transition
          currentIndex = 0;
          updateSlider(currentIndex, true);
        } else {
          currentIndex++;
          updateSlider(currentIndex);
        }
      });
      
      // Initialize slider position
      updateSlider(currentIndex);
    }
  });
  
  
  document.addEventListener("DOMContentLoaded", function() {
    const videoOverlay = document.getElementById("videoOverlay");
    const videoPlayer = document.getElementById("productVideo");
    const videoClose = document.querySelector(".video-close");
  
    // 1) Listen for the ended event
    videoPlayer.addEventListener("ended", function() {
      // Reset video if desired
      videoPlayer.currentTime = 0;
      // Hide overlay
      videoOverlay.style.display = "none";
    });
  
    // 2) If user clicks the close button
    if (videoClose) {
      videoClose.addEventListener("click", function() {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoOverlay.style.display = "none";
      });
    }
  
    // 3) Example function to open and play the video
    //    (assuming you click a logo or button to open the overlay)
    const centerLogo = document.querySelector(".center-logo");
    if (centerLogo) {
      centerLogo.addEventListener("click", function() {
        // Show overlay
        videoOverlay.style.display = "flex";
        // Play the video
        videoPlayer.play();
      });
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const centerLogo = document.querySelector('.center-logo');
  
    // Create the play icon element
    const playIcon = document.createElement('img');
    playIcon.src = 'images/play.svg';
    playIcon.alt = 'Play Icon';
    playIcon.className = 'play-icon';
    document.body.appendChild(playIcon); // Append it to the body
  
    // Show the play icon when hovering over the logo
    centerLogo.addEventListener('mouseenter', function() {
      playIcon.style.display = 'block';
    });
  
    // Update the play icon's position as the mouse moves over the logo
    centerLogo.addEventListener('mousemove', function(e) {
      playIcon.style.left = e.pageX + 'px';
      playIcon.style.top = e.pageY + 'px';
    });
  
    // Hide the play icon when the mouse leaves the logo
    centerLogo.addEventListener('mouseleave', function() {
      playIcon.style.display = 'none';
    });
  });
  
  