import { inject, Injectable } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Category } from '../../definitions';
import { CreateRoom } from '../modals/create-room/create-room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private dialogService: Dialog = inject(Dialog);

  openCreateRoomDialog(category: Category):void {
    const dialogRef = this.dialogService.open(CreateRoom, {
      data: { category: category }
    });
    dialogRef.closed.subscribe(result => {
      console.log('result', result);
    });
  }
}
