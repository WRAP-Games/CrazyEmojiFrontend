import { inject, Injectable } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Category, Room } from '../../definitions';
import { CreateRoom } from '../modals/create-room/create-room';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private router = inject(Router);
  private dialogService: Dialog = inject(Dialog);
  room: Room | null = null;

  openCreateRoomDialog(category: Category):void {
    const dialogRef = this.dialogService.open(CreateRoom, {
      data: { category: category }
    });
    dialogRef.closed.subscribe(room => {
      if (room !== undefined) {
        console.log('recieved room', room as Room);
        this.setCurrentRoom(room as Room);
        this.router.navigate(['/room/waiting-room']);
      }
    });
  }

  setCurrentRoom(room: Room):void {
    this.room = room;
    console.log('room set to', this.room);
  }
}
