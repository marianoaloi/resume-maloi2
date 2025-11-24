import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Certificate } from '../entity';

@Component({
  selector: 'app-certificates-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './certificates-section.html',
  styleUrl: './certificates-section.css'
})
export class CertificatesSection {
  @Input() certificates: Certificate[] = [];
  @Output() certificateAdded = new EventEmitter<Certificate>();
  @Output() certificateRemoved = new EventEmitter<number>();

  newCertificate: Certificate = {
    name: '',
    institute: '',
    credential: '',
    issued: '',
    url: ''
  };

  addCertificate() {
    if (this.newCertificate.name && this.newCertificate.institute) {
      this.certificateAdded.emit({ ...this.newCertificate });
      this.newCertificate = {
        name: '',
        institute: '',
        credential: '',
        issued: '',
        url: ''
      };
    }
  }

  removeCertificate(index: number) {
    this.certificateRemoved.emit(index);
  }
}
