import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HtmlEditor } from '../html-editor/html-editor';
import { ResumeService } from '../services/resume.service';
import { Historical, Project } from '../entity';

type ProjectField = 'effect' | 'description' | 'tecnicalProj' | 'responsibilities' | 'achivements';

@Component({
  selector: 'app-project-tree-view',
  imports: [CommonModule, FormsModule, HtmlEditor],
  templateUrl: './project-tree-view.html',
  styleUrl: './project-tree-view.css'
})
export class ProjectTreeView {
  selectedField: ProjectField = 'description';

  fieldOptions: { value: ProjectField; label: string }[] = [
    { value: 'effect', label: 'Effect / Impact' },
    { value: 'description', label: 'Description' },
    { value: 'tecnicalProj', label: 'Technical Details' },
    { value: 'responsibilities', label: 'Responsibilities' },
    { value: 'achivements', label: 'Achievements' }
  ];

  expandedCompanies = new Set<number>();
  expandedProjects = new Set<string>();

  constructor(private resumeService: ResumeService) {
    this.resumeService.resume.historicals.forEach((h, i) => {
      this.expandedCompanies.add(i);
      h.projects.forEach((_, pi) => this.expandedProjects.add(`${i}-${pi}`));
    });
  }

  get historicals(): Historical[] {
    return this.resumeService.resume.historicals;
  }

  toggleCompany(index: number) {
    if (this.expandedCompanies.has(index)) {
      this.expandedCompanies.delete(index);
    } else {
      this.expandedCompanies.add(index);
    }
  }

  isCompanyExpanded(index: number): boolean {
    return this.expandedCompanies.has(index);
  }

  toggleProject(companyIdx: number, projectIdx: number) {
    const key = `${companyIdx}-${projectIdx}`;
    if (this.expandedProjects.has(key)) {
      this.expandedProjects.delete(key);
    } else {
      this.expandedProjects.add(key);
    }
  }

  isProjectExpanded(companyIdx: number, projectIdx: number): boolean {
    return this.expandedProjects.has(`${companyIdx}-${projectIdx}`);
  }

  expandAll() {
    this.historicals.forEach((h, i) => {
      this.expandedCompanies.add(i);
      h.projects.forEach((_, pi) => this.expandedProjects.add(`${i}-${pi}`));
    });
  }

  collapseAll() {
    this.expandedCompanies.clear();
    this.expandedProjects.clear();
  }

  getFieldValue(project: Project): string {
    return project[this.selectedField];
  }

  setFieldValue(project: Project, value: string) {
    project[this.selectedField] = value;
  }

  getPlaceholder(): string {
    const found = this.fieldOptions.find(f => f.value === this.selectedField);
    return found ? `Enter ${found.label}...` : 'Click to edit...';
  }
}
