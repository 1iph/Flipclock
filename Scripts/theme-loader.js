
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('clockTheme');
    if (savedTheme && savedTheme !== 'default') {
        document.body.className = `theme-${savedTheme}`;
    }
});