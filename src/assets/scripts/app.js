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








// open-nav-icon-left-mobile
navIcon.addEventListener("click", (e) => {
    nav.classList.toggle("right-0");
    overlay.classList.toggle("hidden");
})

// close-nav-icon-left-mobile
navClose.addEventListener("click", (e) => {
nav.classList.replace( "right-0" ,"-right-64" );
overlay.classList.toggle("hidden");
})

// open-nav-left-mobile
navLeftOpen.addEventListener("click", (e) => {
    navLeft.classList.toggle("left-0");
    overlay.classList.toggle("hidden");
})


// close-nav-left-mobile
closeShopingNavLeft.addEventListener("click", (e) => {
    navLeft.classList.toggle("left-0");
    overlay.classList.toggle("hidden");
})



// submenu-open-btn 
submenuOpenBtn.addEventListener("click", (e) => {
    e.currentTarget.parentElement.classList.toggle("text-orange-300");
    submenuOpenBtn.classList.toggle("submenu-open");
    submenuOpenBtn.classList.toggle("rotate-180");
    submenu.classList.toggle("submenu-open");
   
});






////////////////////////////////////////////////////////////



overlay.addEventListener("click", (e) => {
    // بستن منوی سمت راست اگر باز باشد
    if (nav.classList.contains("right-0")) {
        nav.classList.replace("right-0", "-right-64");
    }
    
    // بستن منوی سمت چپ اگر باز باشد
    if (navLeft.classList.contains("left-0")) {
        navLeft.classList.remove("left-0");
    }
    
    // مخفی کردن overlay
    overlay.classList.add("hidden");
})