import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Education } from '../entity';

@Component({
  selector: 'app-education-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './education-section.html',
  styleUrl: './education-section.css'
})
export class EducationSection {
  @Input() educations: Education[] = [];
  @Output() educationAdded = new EventEmitter<Education>();
  @Output() educationRemoved = new EventEmitter<number>();

  newEducation: Education = { school: '', degree: '', start: '', end: '' };

  addEducation() {
    if (this.newEducation.school && this.newEducation.degree) {
      this.educationAdded.emit({ ...this.newEducation });
      this.newEducation = { school: '', degree: '', start: '', end: '' };
    }
  }

  removeEducation(index: number) {
    this.educationRemoved.emit(index);
  }
}
