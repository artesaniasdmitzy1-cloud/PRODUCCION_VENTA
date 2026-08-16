const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dataAPI', {
  load: () => ipcRenderer.invoke('data:load'),
  save: (json) => ipcRenderer.invoke('data:save', json),
  info: () => ipcRenderer.invoke('data:info'),
  isDesktopApp: true
});
