import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ButtonSize, Category, InputFieldColor } from '../../../definitions';
import { InputField } from "../../components/input-field/input-field";
import { NumberSelector } from "../../components/number-selector/number-selector";

@Component({
  selector: 'app-create-room',
  imports: [InputField, NumberSelector],
  templateUrl: './create-room.html',
  styleUrl: './create-room.scss'
})
export class CreateRoom {
  private injectedData = inject(DIALOG_DATA);
  public readonly InputFieldColor = InputFieldColor;
  category!: Category;
  
  ngOnInit() {
    this.category = this.injectedData.category;
  }
}
