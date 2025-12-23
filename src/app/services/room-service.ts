import { inject, Injectable } from '@angular/core';
import { AlertType, Category, Room } from '../../definitions';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ApiEndpoints } from '../../apiEndpoints';
import { environment } from '../../environment';
import { ApiService } from './api-service';
import { AlertService } from './alert-service';
import { UserService } from './user-service';
import { Signalr } from './signalr';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private router = inject(Router);
  private signalr = inject(Signalr);
  private userService = inject(UserService);
  private apiService: ApiService = inject(ApiService);
  private alertService: AlertService = inject(AlertService);

  currentRoom: Room | null = null;

  createRoom(room: Room):void {
    this.apiService.createRoom(room.name, room.category, room.rounds, room.roundDuration)
      .pipe(take(1))
      .subscribe(response => {
        if (response.success) {
          room.pinCode = response.data;
          this.currentRoom = room;
          this.router.navigate(['/room/waiting-room']);
        } else {
          const errorMessage = ApiEndpoints.CREATE_ROOM.ERRORS.find(ERROR => ERROR.CODE === response.data)?.MESSAGE;
          this.alertService.displayAlert({
            type: AlertType.Error,
            title: 'Failed To Create Room',
            subtitle: errorMessage ?? 'Failed To Create Room Due To Unknown Reasons',
            timeout: 7000
          });
        }
      });
  }

  joinRoom(roomPin: string):void {
    this.apiService.joinRoom(roomPin)
      .pipe(take(1))
      .subscribe(response => {
        if (response.success) {
          this.currentRoom = {
            name: response.data.roomName,
            rounds: response.data.rounds,
            roundDuration: response.data.roundDuration,
            category: this.getCategory(response.data.category),
            creator: this.userService.getOrCreateUser(response.data.roomCreator),
            pinCode: roomPin,
            joinedUsers: response.data.players.map(playerName => this.userService.getOrCreateUser(playerName))
          };
          this.router.navigate(['/room/waiting-room']);
        } else {
          const errorMessage = ApiEndpoints.JOIN_ROOM.ERRORS.find(ERROR => ERROR.CODE === response.data)?.MESSAGE;
          this.alertService.displayAlert({
            type: AlertType.Error,
            title: 'Failed To Join Room',
            subtitle: errorMessage ?? 'Failed To Join Room Due To Unknown Reasons',
            timeout: 7000
          });
        }
      });
  }

  leaveRoom():void {
    console.log('leaveRoom called');
    this.currentRoom = null;
    this.signalr.sendMessage(ApiEndpoints.LEAVE_ROOM.SEND);
  }

  private getCategory(name: string):Category {
    const foundedCategory = environment.categories.find(category => category.name === name);
    return foundedCategory ?? { name: name, description: '', image: '' };
  }
}
