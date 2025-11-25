import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonSize, ComponentIcon, ComponentIconPosition, User } from '../../../definitions';
import { UserProfileImg } from "../user-profile-img/user-profile-img";
import { Button } from "../button/button";

@Component({
  selector: 'app-user-badge',
  imports: [UserProfileImg, Button],
  templateUrl: './user-badge.html',
  styleUrl: './user-badge.scss'
})
export class UserBadge {
  @Input({ required: true }) user!: User;
  @Input() clickable: boolean = true;
  @Output() onBtnClick = new EventEmitter<void>();

  readonly ButtonSize = ButtonSize;
  readonly CloseIcon: ComponentIcon = {
    icon: 'fa-solid fa-x',
    position: ComponentIconPosition.Left
  };

  btnClickHandler():void {
    if (this.clickable) this.onBtnClick.emit();
  }
}
