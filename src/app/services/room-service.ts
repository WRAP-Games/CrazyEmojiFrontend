import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Category, Room } from '../../definitions';
import { CreateRoom } from '../modals/create-room/create-room';
import { Router } from '@angular/router';
import { Signalr } from './signalr';
import { ApiRecieveCommands, ApiSendCommands } from '../../apiEndpoints';
import { Subscription, take } from 'rxjs';
import { categories, roomCreator } from '../../testData';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private router = inject(Router);
  private dialogService: Dialog = inject(Dialog);
  private signalr: Signalr = inject(Signalr);
  currentRoom: Room | null = null;

  openCreateRoomDialog(category: Category):void {
    const dialogRef = this.dialogService.open(CreateRoom, {
      data: { category: category }
    });
    dialogRef.closed.subscribe(room => {
      if (room !== undefined) {
        this.createRoom(room as Room);
      }
    });
  }

  createRoom(room: Room):void {
    this.signalr.listen<string>(ApiRecieveCommands.CREATED_ROOM)
      .pipe(take(1))
      .subscribe(pinCode => {
        room.pinCode = pinCode;
        this.currentRoom = room;
        this.router.navigate(['/room/waiting-room']);
      });
    this.signalr.sendMessage(ApiSendCommands.CREATE_ROOM, room.name);
    this.commanderSelectedListeners();
  }

  joinRoom(roomPin: string):void {
    this.signalr.listen<string>(ApiRecieveCommands.JOINED_ROOM)
      .pipe(take(1))
      .subscribe(pinCode => {
        this.currentRoom = {
          name: 'Room Name',
          rounds: 10,
          roundDuration: 15,
          category: categories[0],
          creator: roomCreator,
          pinCode: pinCode,
          invitedUsers: [],
          joinedUsers: []
        };
        this.router.navigate(['/room/waiting-room']);
      });
    this.signalr.sendMessage(ApiSendCommands.JOIN_ROOM, roomPin);
    this.commanderSelectedListeners();
  }

  commanderSelectedListeners():void {
    let commanderSelectedSub: Subscription;
    let commanderAnnouncedSub: Subscription;

    commanderSelectedSub = this.signalr.listen<string>(ApiRecieveCommands.COMMANDER_SELECTED)
      .pipe(take(1))
      .subscribe(msg => {
        console.log('[GLOBAL LISTENER] commander selected');
        commanderAnnouncedSub.unsubscribe();
      });
    
    commanderAnnouncedSub = this.signalr.listen<string>(ApiRecieveCommands.COMMANDER_ANNOUNCED)
      .pipe(take(1))
      .subscribe(msg => {
        console.log('[GLOBAL LISTENER] commander announced');
        commanderSelectedSub.unsubscribe();
      });
  }
}
