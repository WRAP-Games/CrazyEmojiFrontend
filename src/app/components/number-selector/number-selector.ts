import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from "../button/button";
import { ButtonSize, ComponentIcon, ComponentIconPosition } from '../../../definitions';

@Component({
  selector: 'app-number-selector',
  imports: [Button],
  templateUrl: './number-selector.html',
  styleUrl: './number-selector.scss'
})
export class NumberSelector {
  @Input() title: string | null = null;
  @Input() startValue: number = 0;
  @Input() stepValue: number = 1;
  @Input() maxValue: number | null = null;
  @Input() minValue: number | null = null;
  @Output() onValueChange: EventEmitter<number> = new EventEmitter<number>();
  value: number = 0;
  
  readonly ButtonSize = ButtonSize;
  readonly PlusButtonIcon: ComponentIcon = {
    icon: 'fa-solid fa-plus',
    position: ComponentIconPosition.Left
  }
  readonly MinusButtonIcon: ComponentIcon = {
    icon: 'fa-solid fa-minus',
    position: ComponentIconPosition.Left
  }

  ngOnInit() {
    this.value = this.startValue;
    this.onValueChange.emit(this.value);
  }

  increaseValue():void {
    if (this.maxValue && this.value + this.stepValue > this.maxValue) return;
    this.value += this.stepValue;
    this.onValueChange.emit(this.value);
  }

  decreaseValue():void {
    if (this.minValue && this.value - this.stepValue < this.minValue) return;
    this.value -= this.stepValue;
    this.onValueChange.emit(this.value);
  }
}
