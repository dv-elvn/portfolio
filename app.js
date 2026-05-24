// Wait until the website layout is completely loaded
/* eslint-env browser */
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Grab all elements we want to animate on scroll
    // We are targeting sections, cards, and forms
    const scrollElements = document.querySelectorAll('.section, .project-card, .contact-form');

    // 2. Setup the Intersection Observer (The Watcher)
    const elementWatcher = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element enters 15% into the screen area
            if (entry.isIntersecting) {
                // Add the CSS class that triggers the animation
                entry.target.classList.add('reveal-active');
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is visible
    });

    // 3. Tell the watcher to keep an eye on every single element we selected
    scrollElements.forEach(element => {
        // First, add the initial hidden state class
        element.classList.add('reveal-hidden');
        // Then start watching it
        elementWatcher.observe(element);
    });

});
