document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
  
    // 1) Parse the "tab" parameter from "?tab=___"
    const urlParams = new URLSearchParams(window.location.search);
    let requestedTab = urlParams.get('tab'); // e.g. "limited", "luxury", or "abstract"
  
    // 2) Fallback if no parameter is found
    if (!requestedTab) {
      requestedTab = 'limited'; // fallback tab
    }
  
    function switchTab(tabName) {
      // Pause/Reset all videos in all tabs, remove active states
      tabContents.forEach((content) => {
        content.classList.remove("active");
        const allVideos = content.querySelectorAll("video");
        allVideos.forEach((vid) => {
          vid.pause();
          vid.currentTime = 0;
        });
      });
      tabButtons.forEach((btn) => btn.classList.remove("active"));
  
      // Activate the new tab content and button
      const targetBtn = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
      const targetContent = document.getElementById(tabName);
  
      if (targetBtn && targetContent) {
        targetBtn.classList.add("active");
        targetContent.classList.add("active");
  
        // Play the first video in the newly activated tab if desired
        const firstVideo = targetContent.querySelector("video");
        if (firstVideo) firstVideo.play();
      }
    }

   // Click event for tab buttons
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute('data-tab');
      switchTab(tabName);

      // Optionally update the URL to reflect the currently active tab
      const newUrl = `gallery.html?tab=${tabName}`;
      window.history.replaceState(null, "", newUrl);
    });
  });

  // 3) Switch to the requested tab on page load
  switchTab(requestedTab);
});
      
  
    // Default tab is "limited"
    switchTab("limited");
  
  document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
  
    /********************************************************************
     * switchTab(tabName)
     * Hides old tab, shows new tab, and plays the first video in the new tab.
     ********************************************************************/
    function switchTab(tabName) {
      // Hide all tabs, pause and reset all videos
      tabContents.forEach((content) => {
        content.classList.remove("active");
        const allVideos = content.querySelectorAll("video");
        allVideos.forEach((vid) => {
          vid.pause();
          vid.currentTime = 0;
        });
      });
  
      // Remove active from all tab buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
  
      // Activate the new tab content and tab button
      const targetBtn = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
      const targetContent = document.getElementById(tabName);
  
      if (targetBtn && targetContent) {
        targetBtn.classList.add("active");
        targetContent.classList.add("active");
  
        // Automatically play the first video in the new tab
        const firstVideo = targetContent.querySelector("video");
        if (firstVideo) {
          firstVideo.play();
        }
      }
    }
  
    /********************************************************************
     * handleLongPress(video, videosInTab)
     * Called after user has pressed & held a video for the longPressDuration.
     * Pauses & resets other videos in the same tab, then plays the pressed video.
     ********************************************************************/
    function handleLongPress(video, videosInTab) {
      // Pause other videos in this tab
      videosInTab.forEach((otherVid) => {
        otherVid.pause();
        otherVid.currentTime = 0;
      });
      // Play this long-pressed video
      video.play();
    }
  
    /********************************************************************
     * attachLongPressEvents(video, videosInTab)
     * Sets up "pointerdown"/"touchstart" logic to detect a long press.
     * If the press lasts longer than longPressDuration, we call handleLongPress.
     ********************************************************************/
    function attachLongPressEvents(video, videosInTab) {
      let pressTimer = null;
      const longPressDuration = 300; // 800ms = 0.8s hold time
  
      // Common function to clear the timer
      function clearPressTimer() {
        if (pressTimer) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
      }
  
      // Handler when user starts pressing the video
      function pressStart() {
        // If there's already a timer, clear it
        clearPressTimer();
        // Set a new timer
        pressTimer = setTimeout(() => {
          // If the timer completes, it's a "long press"
          handleLongPress(video, videosInTab);
        }, longPressDuration);
      }
  
      // Handler when user ends press or moves away
      function pressEnd() {
        clearPressTimer();
        // If user releases before longPressDuration, do nothing
      }
  
      // For mouse-based devices
      video.addEventListener("mousedown", pressStart);
      video.addEventListener("mouseup", pressEnd);
      video.addEventListener("mouseleave", pressEnd);
  
      // For touch-based devices
      video.addEventListener("touchstart", pressStart, { passive: true });
      video.addEventListener("touchend", pressEnd);
      video.addEventListener("touchcancel", pressEnd);
    }
  
    /********************************************************************
     * Initialize Tab Behavior
     ********************************************************************/
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabName = button.getAttribute("data-tab");
        switchTab(tabName);
      });
    });
  
    /********************************************************************
     * For each tab, attach long-press events to all videos
     ********************************************************************/
    tabContents.forEach((content) => {
      const videos = content.querySelectorAll("video");
      videos.forEach((vid) => {
        attachLongPressEvents(vid, videos);
      });
    });
  
    // Show & auto-play first video's tab by default
    switchTab("limited");
  });
  