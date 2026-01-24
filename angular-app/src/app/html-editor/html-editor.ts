import { Component, Input, Output, EventEmitter, forwardRef, ViewEncapsulation, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  createEditor,
  LexicalEditor,
  $getRoot,
  BLUR_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND
} from 'lexical';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { ListNode, ListItemNode, INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from '@lexical/list';
import { LinkNode, TOGGLE_LINK_COMMAND, $isLinkNode, toggleLink } from '@lexical/link';
import { $getSelection, $isRangeSelection } from 'lexical';
import { HeadingNode, QuoteNode, registerRichText } from '@lexical/rich-text';
import { registerList } from '@lexical/list';

@Component({
  selector: 'app-html-editor',
  imports: [CommonModule, FormsModule],
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
export class HtmlEditor implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChild('lexicalEditor', { static: false }) editorRef!: ElementRef<HTMLDivElement>;
  @Input() isEditMode = false;
  @Input() placeholder = 'Click to edit...';
  @Input() content = '';
  @Output() contentChange = new EventEmitter<string>();
  @Output() editModeChange = new EventEmitter<boolean>();

  private editor: LexicalEditor | null = null;
  private pendingContent: string | null = null;
  showLinkInput = false;
  linkUrl = '';
  private onChange = (value: string) => {};
  private onTouched = () => {};

  private readonly editorConfig = {
    namespace: 'ResumeEditor',
    theme: {
      paragraph: 'lexical-paragraph',
      text: {
        bold: 'lexical-text-bold',
        italic: 'lexical-text-italic',
        underline: 'lexical-text-underline'
      },
      list: {
        ul: 'lexical-list-ul',
        ol: 'lexical-list-ol',
        listitem: 'lexical-list-item'
      }
    },
    nodes: [HeadingNode, ListNode, ListItemNode, LinkNode, QuoteNode],
    onError: (error: Error) => console.error('Lexical Error:', error)
  };

  ngAfterViewInit(): void {
    if (this.isEditMode) {
      this.initializeLexicalEditor();
    }
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.setRootElement(null);
      this.editor = null;
    }
  }
  
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.editModeChange.emit(this.isEditMode);

    if (this.isEditMode) {
      setTimeout(() => this.initializeLexicalEditor(), 0);
    } else {
      if (this.editor) {
        this.editor.setRootElement(null);
        this.editor = null;
      }
    }
  }

  private initializeLexicalEditor(): void {
    if (!this.editorRef || this.editor) return;

    this.editor = createEditor(this.editorConfig);
    this.editor.setRootElement(this.editorRef.nativeElement);

    // Register plugins for keyboard handling (backspace, delete, enter, etc.)
    registerRichText(this.editor);
    registerList(this.editor);

    // Register link command handler
    this.editor.registerCommand(
      TOGGLE_LINK_COMMAND,
      (payload: string | null) => {
        toggleLink(payload);
        return true;
      },
      COMMAND_PRIORITY_LOW
    );

    // Load existing content
    if (this.content) {
      this.loadHtmlContent(this.content);
    } else if (this.pendingContent) {
      this.loadHtmlContent(this.pendingContent);
      this.pendingContent = null;
    }

    // Register update listener for form integration
    this.editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const html = this.exportToHtml();
        this.onContentChange(html);
      });
    });

    // Register blur command
    this.editor.registerCommand(
      BLUR_COMMAND,
      () => {
        this.onBlur();
        return false;
      },
      COMMAND_PRIORITY_LOW
    );

    // Auto-focus
    setTimeout(() => this.editor?.focus(), 0);
  }

  private loadHtmlContent(htmlString: string): void {
    if (!this.editor || !htmlString) return;

    this.editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(htmlString, 'text/html');
      const nodes = $generateNodesFromDOM(this.editor!, dom);

      const root = $getRoot();
      root.clear();
      root.append(...nodes);
    });
  }

  private exportToHtml(): string {
    if (!this.editor) return '';

    let htmlString = '';
    this.editor.getEditorState().read(() => {
      htmlString = $generateHtmlFromNodes(this.editor!, null);
    });

    return htmlString;
  }

  onContentChange(content: string) {
    this.content = content;
    this.contentChange.emit(content);
    this.onChange(content);
  }

  onBlur() {
    this.onTouched();
  }

  // Toolbar actions
  formatText(format: 'bold' | 'italic' | 'underline'): void {
    if (!this.editor) return;
    this.editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  }

  formatList(listType: 'ul' | 'ol'): void {
    if (!this.editor) return;
    const command = listType === 'ul'
      ? INSERT_UNORDERED_LIST_COMMAND
      : INSERT_ORDERED_LIST_COMMAND;
    this.editor.dispatchCommand(command, undefined);
  }

  toggleLink(): void {
    if (!this.editor) return;

    this.editor.getEditorState().read(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      const nodes = selection.getNodes();
      const isLink = nodes.some(node => {
        const parent = node.getParent();
        return $isLinkNode(parent) || $isLinkNode(node);
      });

      if (isLink) {
        this.editor!.dispatchCommand(TOGGLE_LINK_COMMAND, null);
      } else {
        this.showLinkInput = true;
        this.linkUrl = '';
      }
    });
  }

  applyLink(): void {
    if (!this.editor || !this.linkUrl) return;
    this.editor.dispatchCommand(TOGGLE_LINK_COMMAND, this.linkUrl);
    this.closeLinkInput();
  }

  closeLinkInput(): void {
    this.showLinkInput = false;
    this.linkUrl = '';
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.content = value || '';
    if (this.editor && this.isEditMode) {
      this.loadHtmlContent(this.content);
    } else {
      this.pendingContent = this.content;
    }
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
