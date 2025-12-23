import { Component, inject, Input } from '@angular/core';
import { Button } from "../button/button";
import { ButtonSize, Category, ComponentIcon, ComponentIconPosition, Room } from '../../../definitions';
import { RoomService } from '../../services/room-service';
import { Dialog } from '@angular/cdk/dialog';
import { CreateRoom } from '../../modals/create-room/create-room';

@Component({
  selector: 'app-category-widget',
  imports: [Button],
  templateUrl: './category-widget.html',
  styleUrl: './category-widget.scss'
})
export class CategoryWidget {
  @Input({ required: true }) category!: Category;
  public ButtonSize = ButtonSize;
  private roomService: RoomService = inject(RoomService);
  private dialogService: Dialog = inject(Dialog);
  

  readonly SelectCategoryBtnIcon: ComponentIcon = {
    icon: 'fa-solid fa-play',
    position: ComponentIconPosition.Left
  };

  openCreateRoomDialog():void {
    const dialogRef = this.dialogService.open(CreateRoom, {
      data: { category: this.category }
    });
    dialogRef.closed.subscribe(room => {
      if (room !== undefined) {
        this.roomService.createRoom(room as Room);
      }
    });
  }
}
