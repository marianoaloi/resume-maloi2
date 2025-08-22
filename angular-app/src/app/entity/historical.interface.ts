import { Project } from './project.interface';

export interface Historical {
  company: string;
  start: string;
  end: string;
  tecnical: string;
  manager: string;
  projects: Project[];
  tecnical_short: string;
  manager_short: string;
}