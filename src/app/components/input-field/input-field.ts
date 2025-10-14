import { Component, Input } from '@angular/core';
import { ComponentIcon, ComponentIconPosition, InputFieldColor } from '../../../definitions';

@Component({
  selector: 'app-input-field',
  imports: [],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss'
})
export class InputField {
  @Input() title: string | null = null;
  @Input() subtitle: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() value: string | null = null;
  @Input() icons: ComponentIcon[] = [];
  @Input() error: boolean = false;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() lineHeight: number = 21;
  @Input() minlength: number | null = null;
  @Input() maxlength: number | null = null;
  @Input() color: InputFieldColor = InputFieldColor.Primary;

  public leftSideIcons: ComponentIcon[] = [];
  public rightSideIcons: ComponentIcon[] = [];

  constructor() {
    this.icons.forEach(icon => {
      if (icon.position === ComponentIconPosition.Left) this.leftSideIcons.push(icon);
      else if (icon.position === ComponentIconPosition.Right) this.rightSideIcons.push(icon);
    })
  }
}
