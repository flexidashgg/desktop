const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('desktopAPI', {
    getConfig: () => ipcRenderer.invoke('config:getAll')
});

document.getElementById('config_data').innerText = '1';