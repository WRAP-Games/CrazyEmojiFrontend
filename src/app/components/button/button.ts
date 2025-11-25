import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonCorners, ComponentIconPosition, ButtonSize, ButtonType, ComponentIcon } from '../../../definitions';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() text: string | null = null;
  @Input() icon: ComponentIcon | null = null;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() type: ButtonType = ButtonType.Default;
  @Input() corners: ButtonCorners = ButtonCorners.Default;
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  public ComponentIconPosition = ComponentIconPosition;

  onClickEvent():void {
    this.onClick.emit();
  }
}
