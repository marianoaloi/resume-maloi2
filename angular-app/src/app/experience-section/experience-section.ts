import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HtmlEditor } from '../html-editor/html-editor';
import { Historical, Project } from '../entity';

@Component({
  selector: 'app-experience-section',
  imports: [CommonModule, FormsModule, HtmlEditor],
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.css'
})
export class ExperienceSection {
  @Input() historicals: Historical[] = [];
  @Output() historicalAdded = new EventEmitter<void>();
  @Output() historicalRemoved = new EventEmitter<number>();
  @Output() projectAdded = new EventEmitter<number>();
  @Output() projectRemoved = new EventEmitter<{ historicalIndex: number; projectIndex: number }>();

  currentCompanyIndex = 0;

  dateToLongDate($event: any): string {
    return new Date($event).toISOString();
  }

  longDateToDate(arg0: string | null): string | undefined {
    return arg0 ? arg0.substring(0, 10) : undefined;
  }

  setCurrentCompany(index: number) {
    this.currentCompanyIndex = index;
  }

  getCurrentCompany() {
    return this.historicals[this.currentCompanyIndex];
  }

  addHistorical() {
    this.historicalAdded.emit();
    this.currentCompanyIndex = this.historicals.length;
  }

  removeHistorical(index: number) {
    this.historicalRemoved.emit(index);
    if (this.currentCompanyIndex >= this.historicals.length) {
      this.currentCompanyIndex = Math.max(0, this.historicals.length - 1);
    }
  }

  addProject(historicalIndex: number) {
    this.projectAdded.emit(historicalIndex);
  }

  removeProject(historicalIndex: number, projectIndex: number) {
    this.projectRemoved.emit({ historicalIndex, projectIndex });
  }

  scrollToProject(historicalIndex: number, projectIndex: number) {
    const elementId = `project-${historicalIndex}-${projectIndex}`;
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
