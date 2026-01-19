const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const { Menu, MenuItem } = require('electron');

let mainWindow;

const contextMenu = (mainWindow) => {
  // Sets the spellchecker to check English US and French
mainWindow.webContents.session.setSpellCheckerLanguages(['en-US', 'it-IT', 'pt-BR']);

// Listen for the context-menu event to show a custom context menu
  mainWindow.webContents.on('context-menu', (e, params) => {
    const menu = [];

    if (params.selectionText) {
      menu.push({
        label: 'Copy',
        role: 'copy'
      });

      menu.push({
        label: 'Cut',
        role: 'cut'
      });
    } else {
      menu.push({
        label: 'Paste',
        role: 'paste'
      });
    }


    menu.push({
      label: 'Undo',
      role: 'undo'
    });

    menu.push({
      label: 'Redo',
      role: 'redo'
    });

    const contextMenu = Menu.buildFromTemplate(menu);

    contextMenu.append(new MenuItem({ type: 'separator' }));

    for (const suggestion of params.dictionarySuggestions) {
      contextMenu.append(new MenuItem({
        label: suggestion,
        click: () => mainWindow.webContents.replaceMisspelling(suggestion)
      }))
    }

    contextMenu.append(new MenuItem({ type: 'separator' }));
    // Allow users to add the misspelled word to the dictionary
    if (params.misspelledWord) {
      contextMenu.append(
        new MenuItem({
          label: 'Add to dictionary',
          click: () => mainWindow.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
        })
      )
    }
    contextMenu.popup();
  });
};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, 'img/favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  contextMenu(mainWindow)

  // Load the Angular app
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:4200');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'angular-app/dist/angular-app/browser/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // Create application menu with shortcuts
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => mainWindow.webContents.send('open-shortcut')
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => mainWindow.webContents.send('save-shortcut')
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers for file operations
ipcMain.handle('save-file', async (event, content, fileName) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Save Resume',
    defaultPath: fileName || 'resume.json',
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });

  if (!result.canceled && result.filePath) {
    fs.writeFileSync(result.filePath, content, 'utf-8');
    return { success: true, filePath: result.filePath };
  }
  return { success: false };
});

ipcMain.handle('open-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Open Resume',
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    return { success: true, content, fileName, filePath };
  }
  return { success: false };
});