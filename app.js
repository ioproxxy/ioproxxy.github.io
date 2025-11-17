document.addEventListener('DOMContentLoaded', function() {
    var yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    if (window.Typed && document.getElementById('hero-typed')) {
        new Typed('#hero-typed', {
            strings: [
                'Linux System Admin',
                'Full Stack Developer',
                'Data Scientist',
                'Founder & CEO, Sahoo Technologies Limited'
            ],
            typeSpeed: 55,
            backSpeed: 30,
            backDelay: 2000,
            smartBackspace: true,
            loop: true,
            cursorChar: '|'
        });
    }
    if (window.AOS) {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80
        });
    }
    if (window.gsap) {
        gsap.from('.hero h1', {
            opacity: 0,
            y: 24,
            duration: 0.9
        });
        gsap.from('.hero p', {
            opacity: 0,
            y: 18,
            duration: 0.9,
            delay: 0.15
        });
        gsap.from('.project-card', {
            opacity: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out'
        });
    }
});
