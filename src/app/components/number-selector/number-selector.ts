import { Component, Input } from '@angular/core';
import { Button } from "../button/button";
import { ButtonSize } from '../../../definitions';

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

  public readonly ButtonSize = ButtonSize;
  public value: number = this.startValue;

  increaseValue():void {
    if (this.maxValue && this.value + this.stepValue > this.maxValue) return;
    this.value += this.stepValue;
  }

  decreaseValue():void {
    if (this.minValue && this.value - this.stepValue < this.minValue) return;
    this.value -= this.stepValue;
  }
}
