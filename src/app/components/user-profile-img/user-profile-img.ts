import { Component, Input } from '@angular/core';
import { User } from '../../../definitions';

@Component({
  selector: 'app-user-profile-img',
  imports: [],
  templateUrl: './user-profile-img.html',
  styleUrl: './user-profile-img.scss'
})
export class UserProfileImg {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) size!: number;
}
