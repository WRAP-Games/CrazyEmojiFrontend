import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ButtonSize, Category, ComponentIcon, ComponentIconPosition, InputFieldColor, Room } from '../../../definitions';
import { InputField } from "../../components/input-field/input-field";
import { NumberSelector } from "../../components/number-selector/number-selector";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Button } from "../../components/button/button";
import { Authentication } from '../../services/authentication';

@Component({
  selector: 'app-create-room',
  imports: [InputField, NumberSelector, NgScrollbarModule, Button],
  templateUrl: './create-room.html',
  styleUrl: './create-room.scss'
})
export class CreateRoom {
  private injectedData = inject(DIALOG_DATA);
  private dialogRef: DialogRef<Room> = inject(DialogRef);
  private authenticationService: Authentication = inject(Authentication);
  category!: Category;

  readonly InputFieldColor = InputFieldColor;
  readonly ButtonSize = ButtonSize;
  readonly sendInviteBtnIcon: ComponentIcon = {
    icon: 'fa-solid fa-paper-plane',
    position: ComponentIconPosition.Left
  };
  
  roomName: string = '';
  rounds: number = 10;
  roundDuration: number = 15;
  
  ngOnInit() {
    this.category = this.injectedData.category;
  }

  setRoomName(name: string):void {
    this.roomName = name;
  }

  setRounds(rounds: number):void {
    this.rounds = rounds;
  }

  setRoundDuration(duration: number):void {
    this.roundDuration = duration;
  }

  createRoom():void {
    const room: Room = {
      name: this.roomName,
      rounds: this.rounds,
      roundDuration: this.roundDuration,
      category: this.category,
      creator: this.authenticationService.currentUser,
      pinCode: null,
      joinedUsers: [this.authenticationService.currentUser]
    };
    this.dialogRef.close(room);
  }
}
