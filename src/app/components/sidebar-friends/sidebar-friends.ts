import { Component, Input } from '@angular/core';
import { User } from '../../../definitions';
import { UserProfileImg } from '../user-profile-img/user-profile-img';

@Component({
  selector: 'app-sidebar-friends',
  imports: [UserProfileImg],
  templateUrl: './sidebar-friends.html',
  styleUrl: './sidebar-friends.scss'
})
export class SidebarFriends {
  @Input({ required: true }) users!: User[];
}
