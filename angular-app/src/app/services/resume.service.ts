import { Injectable } from '@angular/core';
import { Resume } from '../entity';

@Injectable({ providedIn: 'root' })
export class ResumeService {
  resume: Resume = {
    name: '',
    telephone: '',
    location: '',
    email: '',
    possition: '',
    presentation: '',
    socialmedias: [],
    skills: [],
    languages: [],
    historicals: [],
    educations: [],
    certificates: []
  };

  fileName: string = 'resume.json';
  filePath: string | null = null;

  async saveResume() {
    const content = JSON.stringify(this.resume, null, 2);

    if (window.electronAPI) {
      if (this.filePath) {
        const result = await window.electronAPI.saveFileDirect(content, this.filePath);
        if (result.success) {
          console.log('Resume saved to:', this.filePath);
        } else {
          console.error('Error saving resume:', result.error);
        }
      } else {
        await this.saveResumeAs();
      }
    } else {
      const dataBlob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.fileName;
      link.click();
    }
  }

  async saveResumeAs() {
    const content = JSON.stringify(this.resume, null, 2);

    if (window.electronAPI) {
      const result = await window.electronAPI.saveFile(content, this.fileName);
      if (result.success && result.filePath) {
        this.filePath = result.filePath;
        this.fileName = result.filePath.split(/[/\\]/).pop() || 'resume.json';
        console.log('Resume saved to:', result.filePath);
      }
    } else {
      const dataBlob = new Blob([content], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = this.fileName;
      link.click();
    }
  }

  async loadResume() {
    if (window.electronAPI) {
      const result = await window.electronAPI.openFile();
      if (result.success && result.content) {
        try {
          const parsed = JSON.parse(result.content);
          Object.assign(this.resume, parsed);
          this.fileName = result.fileName || 'resume.json';
          this.filePath = result.filePath || null;
          console.log('Resume loaded:', this.fileName);
        } catch (error) {
          console.error('Error parsing resume:', error);
        }
      }
    }
  }
}
