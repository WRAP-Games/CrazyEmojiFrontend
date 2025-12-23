import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Button } from "../button/button";
import { ButtonSize, ComponentIcon, ComponentIconPosition } from '../../../definitions';
import { NgScrollbar } from "ngx-scrollbar";
import { emojis } from './noto-emoji';

@Component({
  selector: 'app-input-field-emojis',
  imports: [Button, NgScrollbar],
  templateUrl: './input-field-emojis.html',
  styleUrl: './input-field-emojis.scss'
})
export class InputFieldEmojis {
  @Input() placeholder: string = '';
  @Output() onBtnClick = new EventEmitter<string>();
  @ViewChild('emojiInput') emojiInput!: ElementRef<HTMLSpanElement>;

  private selectedEmojisCodes: number[][] = [];

  readonly notoColorEmojis = emojis;
  readonly ButtonSize = ButtonSize;
  readonly SendIcon: ComponentIcon = {
    icon: 'fa-solid fa-paper-plane',
    position: ComponentIconPosition.Right
  };

  emojiKeyboardVisible: boolean = false;
  enteredEmojis: string = '';

  buttonClickHandler():void {
    this.onBtnClick.emit(this.enteredEmojis);
  }

  onEmojiSelect(base: number[]) {
    this.selectedEmojisCodes.push(base);
    this.enteredEmojis += String.fromCodePoint(...base);
  }

  onKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    if (this.enteredEmojis.length && event.key === 'Backspace') {
      this.selectedEmojisCodes.pop();
      this.enteredEmojis = this.selectedEmojisCodes.map(emojiBase => String.fromCodePoint(...emojiBase)).join('');
      setTimeout(() => this.moveCaretToEnd(), 0);
      return;
    }
  }
  
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
  }

  getStringFromCodePoint(base: number[]):string {
    return String.fromCodePoint(...base);
  }

  private moveCaretToEnd() {
    const el = this.emojiInput.nativeElement;
    el.focus();
    
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}
