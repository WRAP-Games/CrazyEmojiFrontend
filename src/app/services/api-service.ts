import { inject, Injectable } from '@angular/core';
import { Signalr } from './signalr';
import { Observable, Subscription, take } from 'rxjs';
import { ApiEndpoints, CurrentUserDataPayload, JoinedRoomPayload } from '../../apiEndpoints';
import { Category, User } from '../../definitions';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private signalr: Signalr = inject(Signalr);
  private userService: UserService = inject(UserService);

  getCurrentUserData(): Observable<{ success: true; data: CurrentUserDataPayload } | { success: false; data: string }> {
    return new Observable(subscriber => {
      let successSub: Subscription | undefined = undefined;

      const errorSub = this.signalr.listenToError(ApiEndpoints.CURRENT_USER_DATA.SEND)
        .pipe(take(1))
        .subscribe(errorCode => {
          subscriber.next({ success: false, data: errorCode });
          successSub?.unsubscribe();
          subscriber.complete();
        });
      
      successSub = this.signalr.listen<CurrentUserDataPayload>(ApiEndpoints.CURRENT_USER_DATA.RECIEVE)
        .pipe(take(1))
        .subscribe((userData) => {
          subscriber.next({ success: true, data: userData });
          errorSub.unsubscribe();
          subscriber.complete();
        });
      
      this.signalr.sendMessage(ApiEndpoints.CURRENT_USER_DATA.SEND);
    });
  }

  createRoom(name: string, category: Category, rounds: number, roundDuration: number):
  Observable<{ success: true; data: string } | { success: false; data: string }> {
    return new Observable(subscriber => {
      let successSub: Subscription | undefined = undefined;

      const errorSub = this.signalr.listenToError(ApiEndpoints.CREATE_ROOM.SEND)
        .pipe(take(1))
        .subscribe(errorCode => {
          subscriber.next({ success: false, data: errorCode });
          successSub?.unsubscribe();
          subscriber.complete();
        });
      
      successSub = this.signalr.listen<string>(ApiEndpoints.CREATE_ROOM.RECIEVE)
        .pipe(take(1))
        .subscribe((roomCode) => {
          subscriber.next({ success: true, data: roomCode });
          errorSub.unsubscribe();
          subscriber.complete();
        });
      
      this.signalr.sendMessage(ApiEndpoints.CREATE_ROOM.SEND, name, category.name, rounds, roundDuration);
    });
  }

  joinRoom(code: string):Observable<{ success: true; data: JoinedRoomPayload } | { success: false; data: string }> {
    return new Observable(subscriber => {
      let successSub: Subscription | undefined = undefined;

      const errorSub = this.signalr.listenToError(ApiEndpoints.JOIN_ROOM.SEND)
        .pipe(take(1))
        .subscribe(errorCode => {
          subscriber.next({ success: false, data: errorCode });
          successSub?.unsubscribe();
          subscriber.complete();
        });
      
      successSub = this.signalr.listen<JoinedRoomPayload>(ApiEndpoints.JOIN_ROOM.RECIEVE)
        .pipe(take(1))
        .subscribe((roomData) => {
          subscriber.next({ success: true, data: roomData });
          errorSub.unsubscribe();
          subscriber.complete();
        });
      
      this.signalr.sendMessage(ApiEndpoints.JOIN_ROOM.SEND, code);
    });
  }

  startGame():Observable<{ success: true } | { success: false; data: string }> {
    return new Observable(subscriber => {
      let successSub: Subscription | undefined = undefined;

      const errorSub = this.signalr.listenToError(ApiEndpoints.START_GAME.SEND)
        .pipe(take(1))
        .subscribe(errorCode => {
          subscriber.next({ success: false, data: errorCode });
          successSub?.unsubscribe();
          subscriber.complete();
        });
      
      successSub = this.signalr.listen<JoinedRoomPayload>(ApiEndpoints.START_GAME.RECIEVE)
        .pipe(take(1))
        .subscribe((roomData) => {
          subscriber.next({ success: true });
          errorSub.unsubscribe();
          subscriber.complete();
        });
      
      this.signalr.sendMessage(ApiEndpoints.START_GAME.SEND);
    });
  }

  getCommander():Observable<{ success: true; data: User } | { success: false; data: string }> {
    return new Observable(subscriber => {
      let successSub: Subscription | undefined = undefined;

      const errorSub = this.signalr.listenToError(ApiEndpoints.GET_COMMANDER.SEND)
        .pipe(take(1))
        .subscribe(errorCode => {
          subscriber.next({ success: false, data: errorCode });
          successSub?.unsubscribe();
          subscriber.complete();
        });
      
      successSub = this.signalr.listen<string>(ApiEndpoints.GET_COMMANDER.RECIEVE)
        .pipe(take(1))
        .subscribe((username) => {
          subscriber.next({ success: true, data: this.userService.getOrCreateUser(username) });
          errorSub.unsubscribe();
          subscriber.complete();
        });
      
      this.signalr.sendMessage(ApiEndpoints.GET_COMMANDER.SEND);
    });
  }

  getWord():Observable<{ success: true; data: string } | { success: false; data: string }> {
    return new Observable(subscriber => {
      let successSub: Subscription | undefined = undefined;

      const errorSub = this.signalr.listenToError(ApiEndpoints.GET_WORD.SEND)
        .pipe(take(1))
        .subscribe(errorCode => {
          subscriber.next({ success: false, data: errorCode });
          successSub?.unsubscribe();
          subscriber.complete();
        });
      
      successSub = this.signalr.listen<string>(ApiEndpoints.GET_WORD.RECIEVE)
        .pipe(take(1))
        .subscribe((word) => {
          subscriber.next({ success: true, data: word });
          errorSub.unsubscribe();
          subscriber.complete();
        });
      
      this.signalr.sendMessage(ApiEndpoints.GET_WORD.SEND);
    });
  }

  checkWord(word: string):Observable<{ success: true; data: boolean } | { success: false; data: string }> {
    return new Observable(subscriber => {
      let successSub: Subscription | undefined = undefined;

      const errorSub = this.signalr.listenToError(ApiEndpoints.CHECK_WORD.SEND)
        .pipe(take(1))
        .subscribe(errorCode => {
          subscriber.next({ success: false, data: errorCode });
          successSub?.unsubscribe();
          subscriber.complete();
        });
      
      successSub = this.signalr.listen<boolean>(ApiEndpoints.CHECK_WORD.RECIEVE)
        .pipe(take(1))
        .subscribe((result) => {
          subscriber.next({ success: true, data: result });
          errorSub.unsubscribe();
          subscriber.complete();
        });
      
      this.signalr.sendMessage(ApiEndpoints.CHECK_WORD.SEND);
    });
  }

  sendEmojis(emojis: string):Observable<{ success: true } | { success: false; data: string }> {
    return new Observable(subscriber => {
      let successSub: Subscription | undefined = undefined;

      const errorSub = this.signalr.listenToError(ApiEndpoints.SEND_EMOJIS.SEND)
        .pipe(take(1))
        .subscribe(errorCode => {
          subscriber.next({ success: false, data: errorCode });
          successSub?.unsubscribe();
          subscriber.complete();
        });
      
      successSub = this.signalr.listen<boolean>(ApiEndpoints.SEND_EMOJIS.RECIEVE)
        .pipe(take(1))
        .subscribe(() => {
          subscriber.next({ success: true });
          errorSub.unsubscribe();
          subscriber.complete();
        });
      
      this.signalr.sendMessage(ApiEndpoints.SEND_EMOJIS.SEND, emojis);
    });
  }
}
