import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Skill, Language } from '../entity';

@Component({
  selector: 'app-skill-language-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './skill-language-list.html',
  styleUrl: './skill-language-list.css'
})
export class SkillLanguageList {
  @Input() items: (Skill | Language)[] = [];
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() showProgressBar: boolean = false;
  @Input() placeholder: string = 'Item name';

  @Output() itemAdded = new EventEmitter<Skill | Language>();
  @Output() itemRemoved = new EventEmitter<number>();

  newItem: Skill | Language = { name: '', value: 0 };

  addItem() {
    if (this.newItem.name && this.newItem.value) {
      this.itemAdded.emit({ ...this.newItem });
      this.newItem = { name: '', value: 0 };
    }
  }

  removeItem(index: number) {
    this.itemRemoved.emit(index);
  }
}
