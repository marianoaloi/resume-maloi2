const { Menu, MenuItem } = require('electron');

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

module.exports = contextMenu;