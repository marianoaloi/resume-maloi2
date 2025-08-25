import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HtmlEditor } from '../html-editor/html-editor';
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
  imports: [CommonModule, FormsModule, HtmlEditor],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css'
})
export class ProjectForm {
  editMode: { [key: string]: boolean } = {};
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

  newSocialMedia: SocialMedia = { name: '', url: '' };
  newSkill: Skill = { name: '', value: 0 };
  newLanguage: Language = { name: '', value: 0 };
  newEducation: Education = { school: '', degree: '', start: '', end: '' };
  newCertificate: Certificate = { name: '', institute: '', credential: '', issued: '', url: '' };
  
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

  isEditMode(field: string): boolean {
    return this.editMode[field] || false;
  }

  toggleEdit(field: string) {
    this.editMode[field] = !this.editMode[field];
  }

  addSocialMedia() {
    if (this.newSocialMedia.name && this.newSocialMedia.url) {
      this.resume.socialmedias.push({...this.newSocialMedia});
      this.newSocialMedia = { name: '', url: '' };
    }
  }

  removeSocialMedia(index: number) {
    this.resume.socialmedias.splice(index, 1);
  }

  addSkill() {
    if (this.newSkill.name && this.newSkill.value) {
      this.resume.skills.push({...this.newSkill});
      this.newSkill = { name: '', value: 0 };
    }
  }

  removeSkill(index: number) {
    this.resume.skills.splice(index, 1);
  }

  addLanguage() {
    if (this.newLanguage.name && this.newLanguage.value) {
      this.resume.languages.push({...this.newLanguage});
      this.newLanguage = { name: '', value: 0 };
    }
  }

  removeLanguage(index: number) {
    this.resume.languages.splice(index, 1);
  }

  addEducation() {
    if (this.newEducation.school && this.newEducation.degree) {
      this.resume.educations.push({...this.newEducation});
      this.newEducation = { school: '', degree: '', start: '', end: '' };
    }
  }

  removeEducation(index: number) {
    this.resume.educations.splice(index, 1);
  }

  addCertificate() {
    if (this.newCertificate.name && this.newCertificate.institute) {
      this.resume.certificates.push({...this.newCertificate});
      this.newCertificate = { name: '', institute: '', credential: '', issued: '', url: '' };
    }
  }

  removeCertificate(index: number) {
    this.resume.certificates.splice(index, 1);
  }

  addHistorical() {
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

  removeHistorical(index: number) {
    this.resume.historicals.splice(index, 1);
  }

  addProject(historicalIndex: number) {
    const newProject: Project = {
      name: '',
      start: '',
      end: null,
      effect: '',
      description: '',
      tecnicalProj: '',
      responsibilities: '',
      achivements: ''
    };
    this.resume.historicals[historicalIndex].projects.push(newProject);
  }

  removeProject(historicalIndex: number, projectIndex: number) {
    this.resume.historicals[historicalIndex].projects.splice(projectIndex, 1);
  }

  saveResume() {
    console.log('Resume saved:', this.resume);
    const dataStr = JSON.stringify(this.resume, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.json';
    link.click();
  }

  loadResume(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          this.resume = JSON.parse(result);
        } catch (error) {
          console.error('Error loading resume:', error);
        }
      };
      reader.readAsText(file);
    }
  }

  isLongText(text: string): boolean {
    return text.length > 100;
  }
}
