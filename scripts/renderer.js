// Set theme
window.matchMedia('(prefers-color-scheme: light)').matches ? document.body.setAttribute("data-bs-theme", 'light') : document.body.setAttribute("data-bs-theme", 'dark');

const selectButton = document.getElementById('form_submit');
const instanceInput = document.getElementById('form_url');

selectButton.addEventListener('click', () => {
    const instance = instanceInput.value;
    if (!instance || instance == null || instance == '') return console.log('no instance set');

    window.desktopAPI.selectInstance(instance);
});