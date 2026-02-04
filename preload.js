const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (content, fileName) => ipcRenderer.invoke('save-file', content, fileName),
  saveFileDirect: (content, filePath) => ipcRenderer.invoke('save-file-direct', content, filePath),
  openFile: () => ipcRenderer.invoke('open-file'),
  onSaveShortcut: (callback) => ipcRenderer.on('save-shortcut', callback),
  onSaveAsShortcut: (callback) => ipcRenderer.on('save-as-shortcut', callback),
  onOpenShortcut: (callback) => ipcRenderer.on('open-shortcut', callback)
});
