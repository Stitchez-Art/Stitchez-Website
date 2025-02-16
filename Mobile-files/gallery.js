document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
  
    // 1) Read "?tab=___" from URL or fallback to "limited"
    const urlParams = new URLSearchParams(window.location.search);
    let requestedTab = urlParams.get("tab") || "limited";
  
    /*************************************************************
     * switchTab(tabName)
     * Shows the chosen tab, hides others, and auto-plays the first video.
     *************************************************************/
    function switchTab(tabName) {
      // Hide all tab contents, pause & reset all videos
      tabContents.forEach((content) => {
        content.classList.remove("active");
  
        const videos = content.querySelectorAll("video");
        videos.forEach((vid) => {
          vid.pause();
          vid.currentTime = 0;
        });
      });
  
      // Remove active class from all tab buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
  
      // Activate the new tab button
      const targetBtn = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
      const targetContent = document.getElementById(tabName);
  
      if (targetBtn && targetContent) {
        targetBtn.classList.add("active");
        targetContent.classList.add("active");
  
        // Auto-play the first video in the new tab
        const firstVideo = targetContent.querySelector("video");
        if (firstVideo) {
          firstVideo.play();
        }
      }
    }
  
    /*************************************************************
     * handleLongPress(video, videosInTab)
     * Called after a long press (e.g., 800ms).
     * Stops all other videos in the same tab, plays the pressed one.
     *************************************************************/
    function handleLongPress(video, videosInTab) {
      // Pause other videos in the same tab
      videosInTab.forEach((otherVid) => {
        otherVid.pause();
        otherVid.currentTime = 0;
      });
      // Play the long-pressed video
      video.play();
    }
  
    /*************************************************************
     * attachLongPressEvents(video, videosInTab)
     * Sets up "press and hold" detection (800ms).
     *************************************************************/
    function attachLongPressEvents(video, videosInTab) {
      let pressTimer = null;
      const longPressDuration = 300; // 800ms hold
  
      function clearPressTimer() {
        if (pressTimer) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
      }
  
      function pressStart() {
        // If there's already a timer, clear it
        clearPressTimer();
        // Set a new timer
        pressTimer = setTimeout(() => {
          // Timer completes => long press
          handleLongPress(video, videosInTab);
        }, longPressDuration);
      }
  
      function pressEnd() {
        // If user releases early => no long press
        clearPressTimer();
      }
  
      // Mouse events
      video.addEventListener("mousedown", pressStart);
      video.addEventListener("mouseup", pressEnd);
      video.addEventListener("mouseleave", pressEnd);
  
      // Touch events
      video.addEventListener("touchstart", pressStart, { passive: true });
      video.addEventListener("touchend", pressEnd);
      video.addEventListener("touchcancel", pressEnd);
    }
  
    /*************************************************************
     * Initialize: attach events & switch to requested tab
     *************************************************************/
    // A) Attach click events to tab buttons
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabName = button.getAttribute("data-tab");
        switchTab(tabName);
  
        // Optional: update the URL so reloads or back button reflect the active tab
        const newUrl = `gallery.html?tab=${tabName}`;
        window.history.replaceState(null, "", newUrl);
      });
    });
  
    // B) For each tab, attach the long-press logic to all its videos
    tabContents.forEach((content) => {
      const videos = content.querySelectorAll("video");
      videos.forEach((vid) => {
        attachLongPressEvents(vid, videos);
      });
    });
  
    // C) Switch to the requested tab on page load
    switchTab(requestedTab);
  });
  