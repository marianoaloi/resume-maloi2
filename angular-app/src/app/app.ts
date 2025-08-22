import { Component, signal } from '@angular/core';
import { ProjectForm } from './project-form/project-form';

@Component({
  selector: 'app-root',
  imports: [ProjectForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-app');
}
