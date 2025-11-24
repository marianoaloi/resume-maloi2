import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HtmlEditor } from '../html-editor/html-editor';

interface PersonalInfo {
  name: string;
  possition: string;
  email: string;
  telephone: string;
  location: string;
  presentation: string;
}

@Component({
  selector: 'app-personal-info-section',
  imports: [CommonModule, FormsModule, HtmlEditor],
  templateUrl: './personal-info-section.html',
  styleUrl: './personal-info-section.css'
})
export class PersonalInfoSection {
  @Input() personalInfo!: PersonalInfo;

  editMode: { [key: string]: boolean } = {};

  isEditMode(field: string): boolean {
    return this.editMode[field] || false;
  }

  toggleEdit(field: string) {
    this.editMode[field] = !this.editMode[field];
  }
}
