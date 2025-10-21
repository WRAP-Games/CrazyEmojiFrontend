import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ButtonSize, Category, ComponentIcon, ComponentIconPosition, InputFieldColor, Room, User } from '../../../definitions';
import { InputField } from "../../components/input-field/input-field";
import { NumberSelector } from "../../components/number-selector/number-selector";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Button } from "../../components/button/button";
import { currentUser, users } from '../../../testData';
import { UserProfileImg } from "../../components/user-profile-img/user-profile-img";

interface InvitableUser {
  user: User,
  invited: boolean
}

@Component({
  selector: 'app-create-room',
  imports: [InputField, NumberSelector, NgScrollbarModule, Button, UserProfileImg],
  templateUrl: './create-room.html',
  styleUrl: './create-room.scss'
})
export class CreateRoom {
  private injectedData = inject(DIALOG_DATA);
  private dialogRef: DialogRef<Room> = inject(DialogRef);
  category!: Category;
  invitableUsers: InvitableUser[] = [];

  readonly users = users;
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
    this.users.forEach(user => {
      this.invitableUsers.push({
        user: user,
        invited: false
      });
    });
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

  inviteUser(user: InvitableUser) {
    user.invited = true;
  }

  createRoom():void {
    const room: Room = {
      name: this.roomName,
      rounds: this.rounds,
      roundDuration: this.roundDuration,
      category: this.category,
      creator: currentUser,
      pinCode: 'JXDF78',
      invitedUsers: this.getInvitedUsers()
    };
    this.dialogRef.close(room);
  }

  private getInvitedUsers():User[] {
    const invitedInvitableUsers = this.invitableUsers.filter(invitableUser => invitableUser.invited);
    return invitedInvitableUsers.map(invitableUser => invitableUser.user);
  }
}
