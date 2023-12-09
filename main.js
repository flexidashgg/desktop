const { app, BrowserWindow, session, ipcMain, nativeTheme } = require('electron');
const Store = require('electron-store');
const path = require('path');

const store = new Store();

if (require('electron-squirrel-startup')) app.quit();

// Auto update checker
require('update-electron-app')();

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1280,
        height: 720,

        webPreferences: {
            preload: path.join(__dirname, 'scripts/preload.js')
        },

        // Hide menu bar unless ALT is pressed
        autoHideMenuBar: true,
        title: 'FlexiDash Desktop'
    });

    // Load file
    // window.loadFile('views/index.html');

    // Settings data
    let config = store.get('config');
    if (!config) {
        store.set('config', {
            instance: {
                url: 'http://localhost:3000',
            }
        });

        config = store.get('config');
    }

    // Update user agent
    window.webContents.setUserAgent('FlexiDashDesktop/1.0 (Electron)');

    // Intercept all web requests
    const filter = {
        urls: ['*://*/*']
    };

    session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
        if (details.url.includes('/desktop/changeInstance')) {
            store.set('config.instance.url', null);

            window.loadFile('views/index.html');
            return callback({ cancel: true, redirectURL: '/' });
        }

        if (details.url.includes(config.instance.url) && !details.url.includes('desktop=true')) {
            // Modify the URL to include ?desktop=true
            const modifiedUrl = details.url + (details.url.includes('?') ? '&' : '?') + 'desktop=true';
            details.url = modifiedUrl;

            return callback({ cancel: false, redirectURL: details.url });
        }

        return callback({ cancel: false });
    });

    // IPC events
    // Instance selection changer
    ipcMain.on('selectInstance', (event, data) => {
        //console.log(`[selectInstance] Received data from IPC: ${data}`);

        window.loadFile('views/loading.html');

        // Update & re-store config
        store.set('config.instance.url', data);
        config = store.get('config');

        // Redirect to URL
        setTimeout(() => {
            window.webContents.loadURL(config.instance.url);
        }, 250);
    });

    // Load content
    window.loadFile('views/loading.html');
    setTimeout(() => {
        if (!config.instance.url) window.loadFile('views/index.html');
        else window.webContents.loadURL(config.instance.url);
    }, 250);

    // DevTools
    // window.webContents.openDevTools();
}

app.whenReady().then(() => {
    // Handle application data being sent back
    ipcMain.handle('config:getAll', async () => {
        return 'config';
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});