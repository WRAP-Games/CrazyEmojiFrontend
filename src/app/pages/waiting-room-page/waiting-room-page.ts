import { Component, inject } from '@angular/core';
import { NavbarService } from '../../services/navbar-service';
import { RoomService } from '../../services/room-service';
import { Room } from '../../../definitions';

@Component({
  selector: 'app-waiting-room-page',
  imports: [],
  templateUrl: './waiting-room-page.html',
  styleUrl: './waiting-room-page.scss'
})
export class WaitingRoomPage {
  private navbarService: NavbarService = inject(NavbarService);
  private roomService: RoomService = inject(RoomService);
  room: Room | null = null;

  ngOnInit() {
    this.room = this.roomService.room;
    console.log('room', this.room);
    this.navbarService.disableNavbar();
  }
}
