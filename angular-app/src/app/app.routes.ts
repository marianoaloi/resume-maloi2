import { Routes } from '@angular/router';
import { ProjectForm } from './project-form/project-form';

export const routes: Routes = [
  { path: '', component: ProjectForm },
  {
    path: 'tree-view',
    loadComponent: () =>
      import('./project-tree-view/project-tree-view').then(m => m.ProjectTreeView)
  },
  { path: '**', redirectTo: '' }
];
