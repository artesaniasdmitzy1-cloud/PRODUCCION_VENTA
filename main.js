const { app, BrowserWindow, ipcMain, shell, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

function getDataPath() {
  return path.join(app.getPath('userData'), 'admy_data.json');
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1320,
    height: 840,
    minWidth: 1024,
    minHeight: 640,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    backgroundColor: '#F7F2E9',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  Menu.setApplicationMenu(null); // sin menú técnico de Windows/Archivo/Edición

  win.loadFile('index.html');

  // Cualquier enlace externo (por ejemplo, abrir Gmail para el respaldo)
  // se abre en el navegador normal de Windows, no dentro de la app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

/* ---- Puente de datos: el sistema guarda su información en un
   archivo JSON dentro de la carpeta de datos de la aplicación,
   NO en la caché del navegador. Esto es más seguro y persistente. */
ipcMain.handle('data:load', async () => {
  try {
    const p = getDataPath();
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf-8');
    return null;
  } catch (e) {
    return null;
  }
});

ipcMain.handle('data:save', async (_evt, json) => {
  try {
    fs.writeFileSync(getDataPath(), json, 'utf-8');
    return true;
  } catch (e) {
    return false;
  }
});

ipcMain.handle('data:info', async () => ({
  dataFile: getDataPath(),
  downloadsFolder: app.getPath('downloads')
}));
