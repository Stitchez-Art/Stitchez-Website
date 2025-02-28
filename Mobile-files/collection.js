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
    const tabs = document.querySelectorAll(".collection-tab");
    const sections = document.querySelectorAll(".collection-content");
  
    // Utility: hide all collection content sections.
    function hideAllSections() {
      sections.forEach(section => section.classList.remove("active"));
    }
  
    // Show the default "all-collection" section.
    function showDefaultSection() {
      hideAllSections();
      const defaultSection = document.getElementById("all-collection");
      if (defaultSection) {
        defaultSection.classList.add("active");
      }
    }
  
    // Attach click events to each tab.
    tabs.forEach(tab => {
      tab.addEventListener("click", function(e) {
        e.preventDefault();
        // If the click came from a nested back button, ignore this event.
        if (e.target.closest(".tab-back-button")) return;
        
        // Remove "active" from all tabs and sections.
        tabs.forEach(t => t.classList.remove("active"));
        hideAllSections();
  
        // Set this tab as active.
        tab.classList.add("active");
  
        // Read the target content ID from data-tab attribute.
        const targetId = tab.getAttribute("data-tab");
        if (targetId) {
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            targetSection.classList.add("active");
          } else {
            // If no matching section is found, show default.
            showDefaultSection();
          }
        } else {
          showDefaultSection();
        }
      });
    });
  
    // Attach event listeners to standalone back buttons in content sections.
    const standaloneBackButtons = document.querySelectorAll(".standalone-back");
    standaloneBackButtons.forEach(btn => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        // Reset tabs and show default section.
        tabs.forEach(t => t.classList.remove("active"));
        showDefaultSection();
      });
    });
  
    // On initial load, if no section is active, show default.
    const anyActive = Array.from(sections).some(section => section.classList.contains("active"));
    if (!anyActive) {
      showDefaultSection();
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll(".collection-tab");
  const backButtons = document.querySelectorAll(".tab-back-button");

  // 1) Ensure all tabs have no .active or .inactive by default
  tabs.forEach(tab => {
    tab.classList.remove("active", "inactive");
  });

  // 2) Clicking a tab => that tab becomes .active, others become .inactive
  tabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
      // If click is on the back button, skip
      if (e.target.closest(".tab-back-button")) return;

      // Remove old classes from all tabs
      tabs.forEach(t => t.classList.remove("active", "inactive"));

      // Mark this clicked tab as active
      tab.classList.add("active");

      // Mark the other tabs as inactive
      tabs.forEach(t => {
        if (t !== tab) {
          t.classList.add("inactive");
        }
      });
    });
  });

  // 3) Back buttons reset everything => all tab text visible
  backButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.stopPropagation(); // Avoid triggering tab click
      // Clear .active and .inactive from all tabs => default state
      tabs.forEach(t => t.classList.remove("active", "inactive"));
    });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const tabNav = document.querySelector(".collection-tab-nav");
  const tabs = document.querySelectorAll(".collection-tab");

  // When a tab is clicked, add .active to that tab and .inactive to others
  tabs.forEach(tab => {
    tab.addEventListener("click", function(e) {
      // Ignore if clicking on a nested back button
      if (e.target.closest(".tab-back-button") || e.target.closest(".standalone-back")) return;
      
      if (!tabNav.classList.contains("tab-activated")) {
        tabNav.classList.add("tab-activated");
      }
      
      // Clear existing state
      tabs.forEach(t => t.classList.remove("active", "inactive"));
      
      // Set clicked tab to active, others to inactive
      tabs.forEach(t => {
        if (t === tab) {
          t.classList.add("active");
        } else {
          t.classList.add("inactive");
        }
      });
    });
  });
  
  // Back button resets the tabs to initial state:
  function resetTabs() {
    tabNav.classList.remove("tab-activated");
    tabs.forEach(t => t.classList.remove("active", "inactive"));
  }

  // Attach listeners to both types of back buttons:
  const tabBackButtons = document.querySelectorAll(".tab-back-button");
  const standaloneBackButtons = document.querySelectorAll(".standalone-back");

  tabBackButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      resetTabs();
    });
  });
  
  standaloneBackButtons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      resetTabs();
    });
  });
});
// Add this code to collection.js
document.addEventListener("DOMContentLoaded", function() {
  const tabWrapper = document.querySelector('.collection-tab-nav-wrapper');
  let lastScrollY = window.scrollY;
  const SCROLL_THRESHOLD = 10; // Adjust this value to control sensitivity

  window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      // Only trigger if scroll difference exceeds threshold
      if (Math.abs(scrollDelta) > SCROLL_THRESHOLD) {
          if (scrollDelta > 0) {
              // Scrolling down - hide tab
              tabWrapper.classList.add('hide');
          } else {
              // Scrolling up - show tab
              tabWrapper.classList.remove('hide');
          }
      }

      // Always show tab when at top of page
      if (currentScrollY <= 0) {
          tabWrapper.classList.remove('hide');
      }

      lastScrollY = currentScrollY;
  });
});