document.addEventListener('DOMContentLoaded', function() {
    let darkMode = document.getElementById('darkTheme');
    darkMode.addEventListener('click', function() {
        let body = document.getElementById('body');
        body.classList.toggle('dark');
        body.classList.toggle('light');
        darkMode.classList.toggle("rotated-image");
    });
});