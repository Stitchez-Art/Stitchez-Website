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
    const tabsContainer = document.getElementById("tabs");
    const tabElements = document.querySelectorAll(".tab");
  
    // Reset all tabs to default (flex:1, no .active/.inactive classes)
    function resetTabs() {
      tabElements.forEach(tab => {
        tab.classList.remove("active", "inactive");
      });
    }
  
    // Activate a tab: set it to .active, others to .inactive
    function activateTab(clickedTab) {
      tabElements.forEach(tab => {
        if (tab === clickedTab) {
          tab.classList.add("active");
        } else {
          tab.classList.add("inactive");
        }
      });
    }
  
    // When user clicks on a tab (except the back button), expand that tab
    tabElements.forEach(tab => {
      tab.addEventListener("click", function(e) {
        // If the user clicked the back button, ignore this
        if (e.target.closest(".tab-back-button")) return;
        // Expand this tab, shrink others
        resetTabs();
        activateTab(tab);
      });
    });
  
    // Back button: resets all tabs to default
    const backButtons = document.querySelectorAll(".tab-back-button");
    backButtons.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.stopPropagation(); // Prevent the tab's main click from firing
        resetTabs();
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    const tabsContainer = document.querySelector(".tabs-container");
    const tabLeft   = document.getElementById("tab-left");
    const tabCenter = document.getElementById("tab-center");
    const tabRight  = document.getElementById("tab-right");
  
    // Reset all expansions: remove classes leftExpanded/centerExpanded/rightExpanded
    // Also remove any .expanded / .shrunk from individual tabs
    function resetTabs() {
      tabsContainer.classList.remove("leftExpanded", "centerExpanded", "rightExpanded");
      [tabLeft, tabCenter, tabRight].forEach(t => {
        t.classList.remove("expanded", "shrunk");
      });
    }
  
    // Expand left tab
    function expandLeft() {
      resetTabs();
      tabsContainer.classList.add("leftExpanded");
      tabLeft.classList.add("expanded");
      // Mark center, right as shrunk => hides text
      tabCenter.classList.add("shrunk");
      tabRight.classList.add("shrunk");
    }
    // Expand center tab
    function expandCenter() {
      resetTabs();
      tabsContainer.classList.add("centerExpanded");
      tabCenter.classList.add("expanded");
      tabLeft.classList.add("shrunk");
      tabRight.classList.add("shrunk");
    }
    // Expand right tab
    function expandRight() {
      resetTabs();
      tabsContainer.classList.add("rightExpanded");
      tabRight.classList.add("expanded");
      tabLeft.classList.add("shrunk");
      tabCenter.classList.add("shrunk");
    }
  
    // For convenience: clicking on the main area triggers expansions
    // If user clicks the back button, we'll reset
    function handleTabClick(e, tab) {
      // If user clicked the back button, skip
      if (e.target.closest(".tab-back-button")) return;
  
      if (tab.id === "tab-left")   expandLeft();
      if (tab.id === "tab-center") expandCenter();
      if (tab.id === "tab-right")  expandRight();
    }
  
    // Attach events
    [tabLeft, tabCenter, tabRight].forEach(tab => {
      // Clicking tab => expand
      tab.addEventListener("click", (e) => handleTabClick(e, tab));
      // Clicking back button => reset
      const backBtn = tab.querySelector(".tab-back-button");
      if (backBtn) {
        backBtn.addEventListener("click", function(e) {
          e.stopPropagation(); // avoid also triggering handleTabClick
          resetTabs();
        });
      }
    });
  
    // Initially, all tabs are in default equal state
    resetTabs();
  });
  document.addEventListener("DOMContentLoaded", function() {
    // Assume your tab-switching code (for header/tabs) is already handling active classes.
    // This script will just ensure that if no collection content is active,
    // the default "All Collection" page is shown.
  
    const contents = document.querySelectorAll(".collection-content");
    
    // If no content section has the active class, set "all-collection" as default.
    let activeFound = false;
    contents.forEach(section => {
      if (section.classList.contains("active")) {
        activeFound = true;
      }
    });
    
    if (!activeFound) {
      const defaultSection = document.getElementById("all-collection");
      if (defaultSection) {
        defaultSection.classList.add("active");
      }
    }
    
    // Optionally, you can add events to the standalone back buttons to reset the view.
    const backButtons = document.querySelectorAll(".standalone-back");
    backButtons.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        contents.forEach(section => section.classList.remove("active"));
        document.getElementById("all-collection").classList.add("active");
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    // Select all tab elements from the tabs-container
    const tabs = document.querySelectorAll(".tabs-container .tab");
    // Select all content sections
    const contentSections = document.querySelectorAll(".collection-content");
  
    // Utility: Hide all content sections
    function hideAllContent() {
      contentSections.forEach(section => section.classList.remove("active"));
    }
  
    // Utility: Reset all tabs (remove active class)
    function resetTabs() {
      tabs.forEach(tab => tab.classList.remove("active"));
    }
  
    // Attach click events to each tab's main clickable area
    tabs.forEach(tab => {
      // Clicking anywhere in the tab (except the back button) will trigger activation.
      tab.addEventListener("click", function(e) {
        // If the click came from the back button, skip this handler.
        if (e.target.closest(".tab-back-button")) return;
  
        resetTabs();
        hideAllContent();
        tab.classList.add("active");
  
        // Get the target content section ID from data-tab attribute
        const targetContentId = tab.getAttribute("data-tab");
        if (targetContentId) {
          const targetSection = document.getElementById(targetContentId);
          if (targetSection) {
            targetSection.classList.add("active");
          }
        }
      });
    });
  
    // Attach click events to the back buttons inside the tab navigation
    const tabBackButtons = document.querySelectorAll(".tabs-container .tab .tab-back-button");
    tabBackButtons.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.stopPropagation(); // Prevent the parent tab's click
        resetTabs();
        hideAllContent();
        // Show the default "All Collection" section
        const defaultSection = document.getElementById("all-collection");
        if (defaultSection) {
          defaultSection.classList.add("active");
        }
      });
    });
  
    // Attach event to standalone back buttons in content sections
    const standaloneBackButtons = document.querySelectorAll(".standalone-back");
    standaloneBackButtons.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        resetTabs();
        hideAllContent();
        const defaultSection = document.getElementById("all-collection");
        if (defaultSection) {
          defaultSection.classList.add("active");
        }
      });
    });
  
    // On initial load, ensure the default section is visible if no tab is active
    if (![...contentSections].some(section => section.classList.contains("active"))) {
      document.getElementById("all-collection").classList.add("active");
    }
  });
    
  