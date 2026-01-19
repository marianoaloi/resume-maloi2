interface ElectronAPI {
  saveFile: (content: string, fileName: string) => Promise<{ success: boolean; filePath?: string }>;
  openFile: () => Promise<{ success: boolean; content?: string; fileName?: string; filePath?: string }>;
  onSaveShortcut: (callback: () => void) => void;
  onOpenShortcut: (callback: () => void) => void;
}

interface Window {
  electronAPI?: ElectronAPI;
}
