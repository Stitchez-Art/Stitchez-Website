document.addEventListener("DOMContentLoaded", () => {
  // Select all tab buttons and content sections
  const tabButtons = document.querySelectorAll(".tab-link");
  const tabContents = document.querySelectorAll(".tab-content");

  // Read the "tab" parameter from the URL, defaulting to "tshirt"
  const urlParams = new URLSearchParams(window.location.search);
  let requestedTab = urlParams.get("tab") || "tshirt";

  /*************************************************************
   * switchTab(tabName)
   * Hides all tab content and removes active states,
   * then activates the requested tab and its corresponding button.
   *************************************************************/
  function switchTab(tabName) {
    // Hide all tab contents
    tabContents.forEach(content => content.classList.remove("active"));
    // Remove active state from all tab buttons
    tabButtons.forEach(btn => btn.classList.remove("active"));

    // Get the matching content and button elements
    const targetContent = document.getElementById(tabName);
    const targetBtn = document.querySelector(`.tab-link[data-tab="${tabName}"]`);

    if (targetContent && targetBtn) {
      targetContent.classList.add("active");
      targetBtn.classList.add("active");
    }
  }

  /*************************************************************
   * Attach click event listeners to each tab button.
   * When a button is clicked, switch to that tab and update the URL.
   *************************************************************/
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const tabName = button.getAttribute("data-tab");
      switchTab(tabName);
      // Update URL (e.g., shop.html?tab=tshirt) without reloading the page.
      window.history.replaceState(null, "", window.location.pathname + "?tab=" + tabName);
    });
  });

  // On page load, switch to the requested tab.
  switchTab(requestedTab);
});
