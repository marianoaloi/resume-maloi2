import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialMedia } from '../entity';

@Component({
  selector: 'app-social-media-section',
  imports: [CommonModule, FormsModule],
  templateUrl: './social-media-section.html',
  styleUrl: './social-media-section.css'
})
export class SocialMediaSection {
  @Input() socialMedias: SocialMedia[] = [];
  @Output() socialMediaAdded = new EventEmitter<SocialMedia>();
  @Output() socialMediaRemoved = new EventEmitter<number>();

  newSocialMedia: SocialMedia = { name: '', url: '' };

  addSocialMedia() {
    if (this.newSocialMedia.name && this.newSocialMedia.url) {
      this.socialMediaAdded.emit({ ...this.newSocialMedia });
      this.newSocialMedia = { name: '', url: '' };
    }
  }

  removeSocialMedia(index: number) {
    this.socialMediaRemoved.emit(index);
  }
}
