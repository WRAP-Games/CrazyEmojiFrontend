import { Component, DestroyRef, inject } from '@angular/core';
import { NavbarService } from '../../services/navbar-service';
import { RoomService } from '../../services/room-service';
import { Button } from "../../components/button/button";
import { AlertI, AlertType, ButtonSize, ComponentIcon, ComponentIconPosition, Room, User } from '../../../definitions';
import { UserBadge } from "../../components/user-badge/user-badge";
import { currentUser, users } from '../../../testData';
import { interval, take } from 'rxjs';
import { NgScrollbar } from "ngx-scrollbar";
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert-service';
import { Signalr } from '../../services/signalr';
import { ApiRecieveCommands, ApiSendCommands } from '../../../apiEndpoints';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-waiting-room-page',
  imports: [Button, UserBadge, NgScrollbar],
  templateUrl: './waiting-room-page.html',
  styleUrl: './waiting-room-page.scss'
})
export class WaitingRoomPage {
  private navbarService: NavbarService = inject(NavbarService);
  private alertService: AlertService = inject(AlertService);
  private signalr = inject(Signalr);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private roomService: RoomService = inject(RoomService);
  
  readonly CurrentUser = currentUser;
  readonly ButtonSize = ButtonSize;
  readonly playIconLeft: ComponentIcon = {
    icon: 'fa-solid fa-circle-play',
    position: ComponentIconPosition.Left
  }
  readonly RoomNotFoundAlert: AlertI = {
    type: AlertType.Error,
    title: 'Room Not Found',
    subtitle: 'Room Not Found'
  };

  room!: Room;

  ngOnInit() {
    if (!this.roomService.currentRoom) {
      this.alertService.displayAlert(this.RoomNotFoundAlert);
      this.router.navigate(['/']);
      return;
    }
    this.room = this.roomService.currentRoom;
    this.navbarService.disableNavbar();
    this.populateUsers();
    this.listenToGameStart();
  }

  startGame():void {
    if (this.room.creator !== currentUser) return;
    this.signalr.sendMessage(ApiSendCommands.START_GAME);
  }

  removeJoinedUser(user: User):void {
    if (this.room.creator !== currentUser) return;
    const userIndex = this.room.joinedUsers.findIndex(joinedUser => joinedUser === user);
    if (userIndex !== undefined && userIndex !== -1) this.room.joinedUsers.splice(userIndex, 1);
  }

  private populateUsers():void {
    let lastJoinedUserIndex = 0;
    interval(3000).pipe(take(users.length)).subscribe(() => {
      this.room.joinedUsers.push(users[lastJoinedUserIndex]);
      lastJoinedUserIndex++;
    });
  }

  private listenToGameStart():void {
    this.signalr.listen<string>(ApiRecieveCommands.GAME_STARTED)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(pinCode => {
        this.room.currentRound = 1;
        this.router.navigate(['/room/game-room']);
      });
  }
}
