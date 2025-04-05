document.addEventListener('DOMContentLoaded', () => {

    // Dark mode functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Load saved theme or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
                        ? 'light' 
                        : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // --- Smooth Scrolling for Nav Links (Fallback/Alternative) ---
    // const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             // Consider header height if fixed
    //             const headerOffset = document.getElementById('main-header').offsetHeight;
    //             const elementPosition = targetElement.getBoundingClientRect().top;
    //             const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    //             window.scrollTo({
    //                 top: offsetPosition,
    //                 behavior: 'smooth'
    //             });

    //             // Close mobile nav if open
    //             const nav = document.querySelector('.nav-links');
    //             if (nav.classList.contains('active')) {
    //                 nav.classList.remove('active');
    //             }
    //         }
    //     });
    // });


    // --- Header Background Change on Scroll ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust scroll distance threshold as needed
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Optional: Change hamburger icon to 'X'
            const icon = mobileNavToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                     mobileNavToggle.querySelector('i').classList.remove('fa-times');
                     mobileNavToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }


    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null, // relative to the viewport
        threshold: 0.1 // trigger when 10% of the element is visible
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Update Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});