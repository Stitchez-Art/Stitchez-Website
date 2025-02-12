// combined.js
class ViewportManager {
    constructor() {
      this.isMobile = window.matchMedia("(max-width: 767px)").matches;
      this.init();
    }
  
    init() {
      this.cleanup();
      if (this.isMobile) {
        this.initMobile();
      } else {
        this.initDesktop();
      }
      this.addEventListeners();
    }
  
    initMobile() {
      // Mobile menu functionality
      const menuToggle = document.querySelector(".menu-toggle");
      const mobileNav = document.querySelector(".mobile-nav");
      
      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        mobileNav.classList.toggle("active");
      });
  
      // Mobile submenu logic...
    }
  
    initDesktop() {
      // Desktop dropdown functionality
      const menuItems = document.querySelectorAll('.menu-item');
      let activeDropdown = null;
  
      menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
          if (activeDropdown) activeDropdown.classList.remove('active-dropdown');
          const target = item.dataset.target;
          const dropdown = document.getElementById(`${target}-menu`);
          dropdown.classList.add('active-dropdown');
          activeDropdown = dropdown;
        });
      });
  
      document.querySelector('header').addEventListener('mouseleave', (e) => {
        if (activeDropdown && !e.relatedTarget?.closest('header')) {
          activeDropdown.classList.remove('active-dropdown');
          activeDropdown = null;
        }
      });
    }
  
    cleanup() {
      // Remove all event listeners
      const clone = document.body.cloneNode(true);
      document.body.replaceWith(clone);
    }
  
    addEventListeners() {
      window.addEventListener('resize', () => {
        const newIsMobile = window.matchMedia("(max-width: 767px)").matches;
        if (newIsMobile !== this.isMobile) {
          this.isMobile = newIsMobile;
          this.init();
        }
      });
    }
  }
  
  // Initialize
  document.addEventListener("DOMContentLoaded", () => new ViewportManager());