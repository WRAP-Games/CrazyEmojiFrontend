import { Component, inject } from '@angular/core';
import { InputField } from "../input-field/input-field";
import { ButtonSize, ComponentIcon, ComponentIconPosition, InputFieldColor } from '../../../definitions';
import { Button } from "../button/button";
import { RoomService } from '../../services/room-service';

@Component({
  selector: 'app-join-room-banner',
  imports: [InputField, Button],
  templateUrl: './join-room-banner.html',
  styleUrl: './join-room-banner.scss'
})
export class JoinRoomBanner {
  roomService: RoomService = inject(RoomService);
  readonly InputFieldColor = InputFieldColor;
  readonly ButtonSize = ButtonSize;
  readonly PlayIcon: ComponentIcon = {
    icon: 'fa-solid fa-play',
    position: ComponentIconPosition.Left
  }
  enteredGamePin: string = '';

  onGamePinEnter(gamePin: string):void {
    this.enteredGamePin = gamePin;
  }
}
