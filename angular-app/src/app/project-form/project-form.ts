import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalInfoSection } from '../personal-info-section/personal-info-section';
import { SocialMediaSection } from '../social-media-section/social-media-section';
import { SkillLanguageList } from '../skill-language-list/skill-language-list';
import { EducationSection } from '../education-section/education-section';
import { CertificatesSection } from '../certificates-section/certificates-section';
import { ExperienceSection } from '../experience-section/experience-section';
import {
  Resume,
  SocialMedia,
  Skill,
  Language,
  Historical,
  Project,
  Education,
  Certificate
} from '../entity';

@Component({
  selector: 'app-project-form',
  imports: [
    CommonModule,
    FormsModule,
    PersonalInfoSection,
    SocialMediaSection,
    SkillLanguageList,
    EducationSection,
    CertificatesSection,
    ExperienceSection
  ],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css'
})
export class ProjectForm {
  fileName: string = 'resume.json';
  currentSection = 'personal';

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

  sections = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'social', name: 'Social Media', icon: '🌐' },
    { id: 'skills', name: 'Skills', icon: '💪' },
    { id: 'languages', name: 'Languages', icon: '🗣️' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'certificates', name: 'Certificates', icon: '📜' }
  ];

  setSection(sectionId: string) {
    this.currentSection = sectionId;
  }

  // Social Media handlers
  onSocialMediaAdded(socialMedia: SocialMedia) {
    this.resume.socialmedias.push(socialMedia);
  }

  onSocialMediaRemoved(index: number) {
    this.resume.socialmedias.splice(index, 1);
  }

  // Skill handlers
  onSkillAdded(skill: Skill) {
    this.resume.skills.push(skill);
  }

  onSkillRemoved(index: number) {
    this.resume.skills.splice(index, 1);
  }

  // Language handlers
  onLanguageAdded(language: Language) {
    this.resume.languages.push(language);
  }

  onLanguageRemoved(index: number) {
    this.resume.languages.splice(index, 1);
  }

  // Education handlers
  onEducationAdded(education: Education) {
    this.resume.educations.push(education);
  }

  onEducationRemoved(index: number) {
    this.resume.educations.splice(index, 1);
  }

  // Certificate handlers
  onCertificateAdded(certificate: Certificate) {
    this.resume.certificates.push(certificate);
  }

  onCertificateRemoved(index: number) {
    this.resume.certificates.splice(index, 1);
  }

  // Historical/Experience handlers
  onHistoricalAdded() {
    const newHistorical: Historical = {
      company: '',
      start: '',
      end: '',
      tecnical: '',
      manager: '',
      projects: [],
      tecnical_short: '',
      manager_short: ''
    };
    this.resume.historicals.push(newHistorical);
  }

  onHistoricalRemoved(index: number) {
    this.resume.historicals.splice(index, 1);
  }

  onProjectAdded(historicalIndex: number) {
    const newProject: Project = {
      name: '',
      start: '',
      end: null,
      effect: '',
      description: '',
      tecnicalProj: '',
      responsibilities: '',
      achivements: '',
      url: ''
    };
    this.resume.historicals[historicalIndex].projects.push(newProject);
  }

  onProjectRemoved(event: { historicalIndex: number; projectIndex: number }) {
    this.resume.historicals[event.historicalIndex].projects.splice(event.projectIndex, 1);
  }

  // File operations
  async saveResume() {
    const content = JSON.stringify(this.resume, null, 2);

    if (window.electronAPI) {
      const result = await window.electronAPI.saveFile(content, this.fileName);
      if (result.success && result.filePath) {
        this.fileName = result.filePath.split(/[/\\]/).pop() || 'resume.json';
        console.log('Resume saved to:', result.filePath);
      }
    } else {
      // Fallback for browser
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
          this.resume = JSON.parse(result.content);
          this.fileName = result.fileName || 'resume.json';
          console.log('Resume loaded:', this.fileName);
        } catch (error) {
          console.error('Error parsing resume:', error);
        }
      }
    }
  }
}
