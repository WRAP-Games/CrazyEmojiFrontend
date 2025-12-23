import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { from, Observable, Subject } from 'rxjs';
import { AlertService } from './alert-service';
import { AlertI, AlertType, ConnectionState } from '../../definitions';
import { HubConnectionState } from '@microsoft/signalr';
import { ApiEndpoints } from '../../apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class Signalr {
  connectionState = new Subject<ConnectionState>();
  private hubConnection!: signalR.HubConnection;
  private alertService: AlertService = inject(AlertService);

  private readonly INITIAL_CONNECTION_FAILED_ALERT: AlertI = {
    type: AlertType.Error,
    title: 'Connection Failed',
    subtitle: `
      The app couldn’t establish a connection to the server.
      Check your internet connection and reload the app.
    `
  };
  private readonly RECONNECTING_STARTED_ALERT: AlertI = {
    type: AlertType.Error,
    title: 'Connection Lost — Reconnecting',
    subtitle: `
      The app is trying to restore the connection to the server.
      Some features may not work during this process.
      Please check your internet connection and wait until reconnection is complete.
    `,
    timeout: 42000
  };
  private readonly RECONNECTED_ALERT: AlertI = {
    type: AlertType.Success,
    title: 'Reconnected Successfully',
    subtitle: `
      The connection to the server has been restored.
      All features are now available.
    `,
    timeout: 10000
  };
  private readonly DISCONNECTED_ALERT: AlertI = {
    type: AlertType.Error,
    title: 'Reconnection Failed',
    subtitle: `
      The app couldn’t restore the connection to the server, and the connection has been closed.
      Please check your internet connection and reload the app.
    `
  };
  private readonly NO_CONNECTION_ALERT: AlertI = {
    type: AlertType.Error,
    title: 'No Server Connection',
    subtitle: `
      This action can’t be completed because the app is not connected to the server.
      Check your internet connection and try again.
    `,
    timeout: 15000
  };

  listen<T = any>(command: string): Observable<T> {
    console.log('[SIGNALR] Listening for command', command);
    return new Observable<T>(subscriber => {
      if (!this.hubConnection) return;
      const handler = (data: T) => {
        subscriber.next(data);
        console.log('[SIGNALR] Recieved data', 'command', command, 'data', data);
      };
      this.hubConnection.on(command, handler);
      return () => {
        this.hubConnection.off(command, handler);
      };
    });
  }
  
  listenToError(command: string): Observable<string> {
    console.log('[SIGNALR] Listening for error for command:', command)
    return new Observable<string>(subscriber => {
      if (!this.hubConnection) return;
      const handler = (error: string) => {
        console.log('[SIGNALR] Recieved error:', error)
        if (error.startsWith(command)) {
          const errorCode = error.slice(command.length + 1);
          subscriber.next(errorCode);
          console.log('[SIGNALR] Error', 'command', command, 'error', errorCode);
        }
      };
      this.hubConnection.on(ApiEndpoints.ERROR.RECIEVE, handler);
      return () => {
        this.hubConnection.off(ApiEndpoints.ERROR.RECIEVE, handler);
      };
    });
  }

  sendMessage(command: string, ...args: any[]) {
    if (this.hubConnection.state !== HubConnectionState.Connected) {
      this.alertService.displayAlert(this.NO_CONNECTION_ALERT);
      return;
    }
    const promise = this.hubConnection.invoke(command, ...args)
      .then(() => console.log('[SIGNALR] Message sent successfully to hub', 'command', command, 'message', ...args))
      .catch(err => console.log('[SIGNALR] Error while sending message:', err));
    return from(promise);
  }

  startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5026/roomHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection.onreconnecting(error => {
      console.log('[SIGNALR] SignalR connection lost. Reconnecting', error);
      this.alertService.displayAlert(this.RECONNECTING_STARTED_ALERT);
    });
    this.hubConnection.onreconnected(connectionId => {
      console.log('[SIGNALR] SignalR reconnected. ConnectionId:', connectionId);
      this.alertService.hideAlert(this.RECONNECTING_STARTED_ALERT);
      this.alertService.displayAlert(this.RECONNECTED_ALERT);
      this.connectionState.next(ConnectionState.Reconnected);
    });
    this.hubConnection.onclose(error => {
      console.log('[SIGNALR] SignalR connection closed', error);
      this.alertService.displayAlert(this.DISCONNECTED_ALERT);
      this.connectionState.next(ConnectionState.Disconnected);
    });

    return this.hubConnection
      .start()
      .then(() => console.log('[SIGNALR] Connection established'))
      .catch(error => {
        console.log('[SIGNALR] Failed to establish connection with a server', error);
        this.alertService.displayAlert(this.INITIAL_CONNECTION_FAILED_ALERT);
        return Promise.resolve();
      });
  }
}
