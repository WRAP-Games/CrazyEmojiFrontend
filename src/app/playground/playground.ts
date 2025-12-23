import { Component } from '@angular/core';
import { InputFieldEmojis } from "../components/input-field-emojis/input-field-emojis";
import { RoundResultsPayload } from '../../apiEndpoints';
import { NgScrollbar } from "ngx-scrollbar";

@Component({
  selector: 'app-playground',
  imports: [InputFieldEmojis, NgScrollbar],
  templateUrl: './playground.html',
  styleUrl: './playground.scss'
})
export class Playground {
  roundResults: RoundResultsPayload[] = [];
}
