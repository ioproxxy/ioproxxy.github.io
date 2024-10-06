document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    let toggle = false;

    // Simple animation on header text
    setInterval(function() {
        if (toggle) {
            header.style.color = '#00ff00';
        } else {
            header.style.color = '#009900';
        }
        toggle = !toggle;
    }, 1000);
});
