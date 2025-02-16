document.addEventListener("DOMContentLoaded", () => {
    // Select the tab buttons and content sections
    const tabButtons = document.querySelectorAll(".custom-tabs .tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
  
    // Read the "tab" query parameter from the URL; default to "t-shirt"
    const urlParams = new URLSearchParams(window.location.search);
    let requestedTab = urlParams.get("tab") || "c-1";
  
    /*************************************************************
     * switchTab(tabName)
     * Hides all tab contents and removes active states, then 
     * activates the requested tab and its corresponding button.
     *************************************************************/
    function switchTab(tabName) {
      // Remove active class from all tab contents
      tabContents.forEach(content => content.classList.remove("active"));
      // Remove active class from all tab buttons
      tabButtons.forEach(btn => btn.classList.remove("active"));
  
      // Get the matching content and button elements
      const targetContent = document.getElementById(tabName);
      const targetBtn = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
  
      if (targetContent && targetBtn) {
        targetContent.classList.add("active");
        targetBtn.classList.add("active");
      }
    }
  
    // Attach click event listeners to each tab button
    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        const tabName = button.getAttribute("data-tab");
        switchTab(tabName);
        // Update the URL query parameter without reloading
        window.history.replaceState(null, "", window.location.pathname + "?tab=" + tabName);
      });
    });
  
    // On page load, switch to the requested tab (from URL or default)
    switchTab(requestedTab);
  });
  