import { inject, Injectable } from '@angular/core';
import { AlertI } from '../../definitions';
import { timer } from 'rxjs';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AlertsWrapper } from '../components/alert/alerts-wrapper/alerts-wrapper';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private overlay: Overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;
  private alerts: [AlertI, boolean][] = [];
  private readonly ALERT_DESTROY_ANIMATION_DURATION = 150;

  displayAlert(alert: AlertI):void {
    if (this.overlayRef === null) this.attachAlertsWrapper();
    this.alerts.push([alert, false]);
    if (alert.timeout) {
      timer(alert.timeout).subscribe(() => {
        this.hideAlert(alert);
      });
    }
  }

  hideAlert(alert: AlertI):void {
    const alertTuple = this.alerts.find(([displayedAlert, hidden]) => displayedAlert === alert && !hidden);
    if (alertTuple === undefined) return;
    alertTuple[1] = true;
    timer(this.ALERT_DESTROY_ANIMATION_DURATION).subscribe(() => {
      const alertTupleIndex = this.alerts.findIndex(tuple => tuple === alertTuple);
      if (alertTupleIndex !== -1) this.alerts.splice(alertTupleIndex, 1);
    });
  }

  private attachAlertsWrapper():void {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .top('20px');
    this.overlayRef = this.overlay.create({ positionStrategy: positionStrategy });
    const alertsWrapperPortal = new ComponentPortal(AlertsWrapper);
    const alertsWrapperRef = this.overlayRef.attach(alertsWrapperPortal);
    alertsWrapperRef.instance.alerts = this.alerts;
  }
}
