const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (content, fileName) => ipcRenderer.invoke('save-file', content, fileName),
  openFile: () => ipcRenderer.invoke('open-file')
});
