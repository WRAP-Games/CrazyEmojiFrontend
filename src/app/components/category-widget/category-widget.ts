import { Component, inject, Input } from '@angular/core';
import { Button } from "../button/button";
import { ButtonSize, Category } from '../../../definitions';
import { RoomService } from '../../services/room-service';

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

  onCreateRoomClick():void {
    this.roomService.openCreateRoomDialog(this.category);
  }
}
