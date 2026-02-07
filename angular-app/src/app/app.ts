import { Component, OnInit, NgZone } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ResumeService } from './services/resume.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private resumeService: ResumeService
  ) {}

  ngOnInit() {
    if (window.electronAPI) {
      window.electronAPI.onSaveShortcut(() => this.resumeService.saveResume());
      window.electronAPI.onSaveAsShortcut(() => this.resumeService.saveResumeAs());
      window.electronAPI.onOpenShortcut(() => {
        this.ngZone.run(() => this.resumeService.loadResume());
      });
      window.electronAPI.onNavigate((route: string) => {
        this.ngZone.run(() => {
          this.router.navigate([route]);
        });
      });
    }
  }
}
