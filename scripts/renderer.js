// Set theme
window.matchMedia('(prefers-color-scheme: light)').matches ? document.body.setAttribute("data-bs-theme", 'light') : document.body.setAttribute("data-bs-theme", 'dark');

// Store inputs for easy access
const selectButton = document.getElementById('form_submit');
const instanceInput = document.getElementById('form_url');

// Listen for form submit
selectButton.addEventListener('click', () => {
    // Update the instance through the Electron API
    const instance = instanceInput.value;
    if (!instance || instance == null || instance == '') return console.log('[selectInstance] No instance specified.');

    window.desktopAPI.selectInstance(instance);
});