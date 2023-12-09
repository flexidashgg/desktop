const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopAPI', {
    selectInstance: (url) => ipcRenderer.send('selectInstance', url),
});
