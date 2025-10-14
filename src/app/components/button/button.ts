import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonColor, ButtonCorners, ComponentIconPosition, ButtonSize, ButtonType } from '../../../definitions';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() text: string | null = null;
  @Input() icon: string | null = null;
  @Input() iconPosition: ComponentIconPosition = ComponentIconPosition.Left;
  @Input() color: ButtonColor = ButtonColor.Primary;
  @Input() size: ButtonSize = ButtonSize.Medium;
  @Input() type: ButtonType = ButtonType.Default;
  @Input() corners: ButtonCorners = ButtonCorners.Default;
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  public ButtonIconPosition = ComponentIconPosition;

  onClickEvent():void {
    this.onClick.emit();
  }
}
