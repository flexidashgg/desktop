const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopAPI', {
    selectInstance: (url) => ipcRenderer.send('selectInstance', url),
});

ipcRenderer.on('version', (event, version) => {
    document.getElementById('version').innerText = version;
});
