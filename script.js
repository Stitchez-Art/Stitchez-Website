document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const dropdowns = document.querySelectorAll('.dropdown-content');
    let activeDropdown = null;

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (activeDropdown) {
                activeDropdown.classList.remove('active-dropdown');
            }
            
            const target = this.dataset.target;
            const dropdown = document.getElementById(`${target}-menu`);
            dropdown.classList.add('active-dropdown');
            activeDropdown = dropdown;
        });
    });

    // Close dropdowns on header mouse leave
    document.querySelector('header').addEventListener('mouseleave', function(e) {
        if (activeDropdown && !e.relatedTarget?.closest('header')) {
            activeDropdown.classList.remove('active-dropdown');
            activeDropdown = null;
        }
    });
});
   