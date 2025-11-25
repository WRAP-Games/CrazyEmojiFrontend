import { Component, Input } from '@angular/core';
import { AlertI } from '../../../../definitions';
import { Alert } from "../alert";

@Component({
  selector: 'app-alerts-wrapper',
  imports: [Alert],
  templateUrl: './alerts-wrapper.html',
  styleUrl: './alerts-wrapper.scss'
})
export class AlertsWrapper {
  @Input({ required: true }) alerts!: [AlertI, boolean][];
}
