import { Component, inject, Input } from '@angular/core';
import { AlertI, AlertType } from '../../../definitions';
import { AlertService } from '../../services/alert-service';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert {
  private alertService: AlertService = inject(AlertService);
  @Input({ required: true }) alert!: AlertI;
  @Input() leaveAnimation: boolean = false;

  hideAlert(alert: AlertI):void {
    this.alertService.hideAlert(alert);
  }
}
