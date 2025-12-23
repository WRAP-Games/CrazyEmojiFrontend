import { Component } from '@angular/core';
import { InputFieldEmojis } from "../components/input-field-emojis/input-field-emojis";

@Component({
  selector: 'app-playground',
  imports: [InputFieldEmojis],
  templateUrl: './playground.html',
  styleUrl: './playground.scss'
})
export class Playground {
}
