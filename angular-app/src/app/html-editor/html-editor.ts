import { Component, Input, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from '../../environments/environment';
import { RawEditorOptions } from 'tinymce';

@Component({
  selector: 'app-html-editor',
  imports: [CommonModule, FormsModule, EditorComponent],
  templateUrl: './html-editor.html',
  styleUrl: './html-editor.css',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HtmlEditor),
      multi: true
    }
  ]
})
export class HtmlEditor implements ControlValueAccessor {
  @Input() isEditMode = false;
  @Input() placeholder = 'Click to edit...';
  @Input() content = '';
  @Output() contentChange = new EventEmitter<string>();
  @Output() editModeChange = new EventEmitter<boolean>();

  // TinyMCE configuration optimized for resume content - using CDN
  init = {
    height: 200,
    menubar: false,
    plugins: [
      'lists', 'link', 'code', 'wordcount', 'autolink', 
      'autosave', 'save', 'paste', 'searchreplace'
    ],
    toolbar: [
      'undo redo | bold italic underline | forecolor backcolor',
      'alignleft aligncenter alignright | bullist numlist | link code | removeformat'
    ].join(' | '),
    content_style: `
      body { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: #333;
      }
    `,
    paste_as_text: false,
    paste_data_images: false,
    paste_remove_styles: false,
    paste_remove_styles_if_webkit: false,
    branding: false,
    promotion: false
  };

  private onChange = (value: string) => {};
  private onTouched = () => {};
  apiKeyTyce: string = environment.tinymceApiKey;
  
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.editModeChange.emit(this.isEditMode);
  }

  onContentChange(content: string) {
    this.content = content;
    this.contentChange.emit(content);
    this.onChange(content);
  }

  onBlur() {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.content = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handle disabled state if needed
  }
}
