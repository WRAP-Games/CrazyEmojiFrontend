import { inject, Injectable } from '@angular/core';
import { ConnectionState, StorageKeys, User } from '../../definitions';
import { Signalr } from './signalr';
import { Storage } from './storage';
import { ApiEndpoints } from '../../apiEndpoints';
import { Subscription, take } from 'rxjs';
import { ApiService } from './api-service';
import { RoomService } from './room-service';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private signalr: Signalr = inject(Signalr);
  private apiService: ApiService = inject(ApiService);
  private roomService: RoomService = inject(RoomService);
  private storageService: Storage = inject(Storage);

  currentUser!: User;
  currentUserLoggedIn: boolean = false;

  constructor() {
    this.signalr.connectionState.subscribe(state => {
      if (state === ConnectionState.Disconnected) this.logout();
      if (state === ConnectionState.Reconnected) {
        const username: string | undefined = this.storageService.getFromStorage(StorageKeys.Username, undefined);
        const password: string | undefined = this.storageService.getFromStorage(StorageKeys.Password, undefined);
        if (username && password) this.login(username, password);
        else this.logout();
      }
    });
  }

  login(username: string, password: string):void {
    let loginSuccessfulSub: Subscription | undefined = undefined;
    const errorSub = this.signalr.listenToError(ApiEndpoints.LOGIN.SEND)
      .pipe(take(1))
      .subscribe(() => {
        this.currentUserLoggedIn = false;
        loginSuccessfulSub?.unsubscribe();
      });

    loginSuccessfulSub = this.signalr.listen<void>(ApiEndpoints.LOGIN.RECIEVE)
      .pipe(take(1))
      .subscribe(() => {
        this.storageService.saveToStorage(StorageKeys.Username, username);
        this.storageService.saveToStorage(StorageKeys.Password, password);
        this.currentUser = { username: username };
        this.currentUserLoggedIn = true;
        this.rejoinRoomOnLogin();
        errorSub.unsubscribe();
      });
    
    this.signalr.sendMessage(ApiEndpoints.LOGIN.SEND, username, password);
  }

  signup(username: string, password: string):void {
    let signUpSuccessfulSub: Subscription | undefined = undefined;
    const errorSub = this.signalr.listenToError(ApiEndpoints.SIGN_UP.SEND)
      .pipe(take(1))
      .subscribe(() => {
        signUpSuccessfulSub?.unsubscribe();
      });

    signUpSuccessfulSub = this.signalr.listen<string>(ApiEndpoints.SIGN_UP.RECIEVE)
      .pipe(take(1))
      .subscribe(() => {
        this.storageService.saveToStorage(StorageKeys.Username, username);
        this.storageService.saveToStorage(StorageKeys.Password, password);
        this.currentUser = { username: username };
        this.currentUserLoggedIn = true;
        errorSub.unsubscribe();
      });
    
    this.signalr.sendMessage(ApiEndpoints.SIGN_UP.SEND, username, password);
  }

  rejoinRoomOnLogin():void {
    if (this.roomService.currentRoom !== null) return;
    this.apiService.getCurrentUserData().subscribe(response => {
      if (response.success && response.data.roomCode !== '-1') {
        this.roomService.joinRoom(response.data.roomCode);
      }
    });
  }

  logout():void {
    console.log('logout called');
    this.storageService.removeFromStorage(StorageKeys.Password);
    this.currentUserLoggedIn = false;
  }
}
