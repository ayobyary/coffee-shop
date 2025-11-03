const toggleThemeBtns = document.querySelectorAll(".toggle-theme-btn");

// Function to update theme
function updateTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
    console.log('Theme changed to:', localStorage.theme);
}

toggleThemeBtns.forEach(btn => {
    btn.addEventListener("click", updateTheme);
});

// Log current theme on page load
console.log('Current theme:', localStorage.theme || 'light');





////////////////////////////////////////////////////////////



// mycode for submenu1


// open-nav-icon-left-mobile
const navIcon        = document.querySelector(".nav-icon");
const nav            = document.querySelector(".nav");

// close-nav-icon-left-mobile
const navClose = document.querySelector(".nav-close");


// submenu-open-btn 
const submenuOpenBtn = document.querySelector(".submenu-open-btn");
const submenu        = document.querySelector(".submenu");

// open-nav-left-mobile


// close-nav-left-mobile
const closeShopingNavLeft = document.querySelector(".close-shoping-nav-left");


const overlay        = document.querySelector(".overlay");

const navLeft        = document.querySelector(".nav-left");
const navLeftOpen    = document.querySelector(".nav-left-open");








// Helper function to get elements
function getNavElements() {
    return {
        navIcon: document.querySelector(".nav-icon"),
        nav: document.querySelector(".nav"),
        navClose: document.querySelector(".nav-close"),
        submenuOpenBtn: document.querySelector(".submenu-open-btn"),
        submenu: document.querySelector(".submenu"),
        closeShopingNavLeft: document.querySelector(".close-shoping-nav-left"),
        overlay: document.querySelector(".overlay"),
        navLeft: document.querySelector(".nav-left"),
        navLeftOpen: document.querySelector(".nav-left-open")
    };
}

// Helper function to open/close nav using transform
function openNav() {
    const elements = getNavElements();
    if (elements.nav) {
        elements.nav.style.transform = "translateX(0)";
    }
    if (elements.overlay) {
        elements.overlay.classList.remove("hidden");
    }
}

function closeNav() {
    const elements = getNavElements();
    if (elements.nav) {
        elements.nav.style.transform = "translateX(100%)";
    }
    if (elements.overlay) {
        elements.overlay.classList.add("hidden");
    }
}

// Helper function to open/close navLeft using transform
function openNavLeft() {
    const elements = getNavElements();
    if (elements.navLeft) {
        elements.navLeft.style.transform = "translateX(0)";
    }
    if (elements.overlay) {
        elements.overlay.classList.remove("hidden");
    }
}

function closeNavLeft() {
    const elements = getNavElements();
    if (elements.navLeft) {
        elements.navLeft.style.transform = "translateX(-100%)";
    }
    if (elements.overlay) {
        elements.overlay.classList.add("hidden");
    }
}

// Use MutationObserver to watch for Angular components
let setupTimeout;
const observer = new MutationObserver(() => {
    // Debounce to avoid too many calls
    clearTimeout(setupTimeout);
    setupTimeout = setTimeout(() => {
        setupEventListeners();
    }, 100);
});

// Start observing when body is available
if (document.body) {
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
} else {
    document.addEventListener('DOMContentLoaded', () => {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// Function to setup event listeners
function setupEventListeners() {
    const elements = getNavElements();
    
    // Remove old listeners to prevent duplicates
    const newNavIcon = elements.navIcon;
    const newNavClose = elements.navClose;
    const newNavLeftOpen = elements.navLeftOpen;
    const newCloseShopingNavLeft = elements.closeShopingNavLeft;
    const newOverlay = elements.overlay;
    
    // Setup nav-icon click
    if (newNavIcon && !newNavIcon.hasAttribute('data-listener-attached')) {
        newNavIcon.setAttribute('data-listener-attached', 'true');
        newNavIcon.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openNav();
        });
    }
    
    // Setup nav-close click
    if (newNavClose && !newNavClose.hasAttribute('data-listener-attached')) {
        newNavClose.setAttribute('data-listener-attached', 'true');
        newNavClose.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeNav();
        });
    }
    
    // Setup nav-left-open click
    if (newNavLeftOpen && !newNavLeftOpen.hasAttribute('data-listener-attached')) {
        newNavLeftOpen.setAttribute('data-listener-attached', 'true');
        newNavLeftOpen.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            openNavLeft();
        });
    }
    
    // Setup close-shoping-nav-left click
    if (newCloseShopingNavLeft && !newCloseShopingNavLeft.hasAttribute('data-listener-attached')) {
        newCloseShopingNavLeft.setAttribute('data-listener-attached', 'true');
        newCloseShopingNavLeft.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeNavLeft();
        });
    }
    
    // Setup overlay click
    if (newOverlay && !newOverlay.hasAttribute('data-listener-attached')) {
        newOverlay.setAttribute('data-listener-attached', 'true');
        newOverlay.addEventListener("click", (e) => {
            if (!newOverlay.classList.contains("hidden")) {
                e.preventDefault();
                e.stopPropagation();
                closeNav();
                closeNavLeft();
            }
        });
    }
}

// Try to setup listeners immediately
setupEventListeners();

// Also try after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEventListeners);
} else {
    setupEventListeners();
}

// Also try after delays to ensure Angular has rendered
setTimeout(setupEventListeners, 100);
setTimeout(setupEventListeners, 500);
setTimeout(setupEventListeners, 1000);



// submenu-open-btn using event delegation
document.addEventListener("click", (e) => {
    let target = e.target;
    
    // Handle SVG clicks
    if (target.tagName === "use" || target.tagName === "path") {
        target = target.closest("svg");
    }
    
    const submenuOpenBtn = target.closest(".submenu-open-btn") || (target.classList && target.classList.contains("submenu-open-btn") ? target : null);
    if (submenuOpenBtn) {
        e.preventDefault();
        const elements = getNavElements();
        const submenu = elements.submenu;
        if (submenu) {
            submenuOpenBtn.parentElement.classList.toggle("text-orange-300");
            submenuOpenBtn.classList.toggle("submenu-open");
            submenuOpenBtn.classList.toggle("rotate-180");
            submenu.classList.toggle("submenu-open");
        }
    }
});






////////////////////////////////////////////////////////////

// Overlay click handler using event delegation
document.addEventListener("click", (e) => {
    const target = e.target;
    const overlay = target.closest(".overlay") || (target.classList && target.classList.contains("overlay") ? target : null);
    
    // اگر روی overlay کلیک شد و overlay مخفی نیست (یعنی sidebar‌ها باز هستند)
    if (overlay && !overlay.classList.contains("hidden")) {
        e.stopPropagation();
        e.preventDefault();
        
        // اگر overlay نمایش داده می‌شود، یعنی یکی از sidebar‌ها باز است
        // پس همه sidebar‌ها را می‌بندیم
        closeNav();
        closeNavLeft();
    }
});