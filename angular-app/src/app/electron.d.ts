interface ElectronAPI {
  saveFile: (content: string, fileName: string) => Promise<{ success: boolean; filePath?: string }>;
  saveFileDirect: (content: string, filePath: string) => Promise<{ success: boolean; filePath?: string; error?: string }>;
  openFile: () => Promise<{ success: boolean; content?: string; fileName?: string; filePath?: string }>;
  onSaveShortcut: (callback: () => void) => void;
  onSaveAsShortcut: (callback: () => void) => void;
  onOpenShortcut: (callback: () => void) => void;
  onNavigate: (callback: (route: string) => void) => void;
}

interface Window {
  electronAPI?: ElectronAPI;
}
