import { Component, DestroyRef, inject } from '@angular/core';
import { NavbarService } from '../../services/navbar-service';
import { RoomService } from '../../services/room-service';
import { Button } from "../../components/button/button";
import { AlertType, ButtonSize, ComponentIcon, ComponentIconPosition, Room } from '../../../definitions';
import { UserBadge } from "../../components/user-badge/user-badge";
import { take } from 'rxjs';
import { NgScrollbar } from "ngx-scrollbar";
import { Router } from '@angular/router';
import { Signalr } from '../../services/signalr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiEndpoints } from '../../../apiEndpoints';
import { Authentication } from '../../services/authentication';
import { UserService } from '../../services/user-service';
import { AlertService } from '../../services/alert-service';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-waiting-room-page',
  imports: [Button, UserBadge, NgScrollbar],
  templateUrl: './waiting-room-page.html',
  styleUrl: './waiting-room-page.scss'
})
export class WaitingRoomPage {
  private navbarService: NavbarService = inject(NavbarService);
  private signalr = inject(Signalr);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private roomService: RoomService = inject(RoomService);
  private userService: UserService = inject(UserService);
  private alertService: AlertService = inject(AlertService);
  private apiService: ApiService = inject(ApiService);
  
  private gameStarted: boolean = false;

  readonly ButtonSize = ButtonSize;
  readonly playIconLeft: ComponentIcon = {
    icon: 'fa-solid fa-circle-play',
    position: ComponentIconPosition.Left
  }

  room!: Room;
  authenticationService: Authentication = inject(Authentication);

  ngOnInit() {
    if (!this.roomService.currentRoom) {
      this.router.navigate(['/']);
      return;
    }
    this.room = this.roomService.currentRoom;
    this.navbarService.disableNavbar();
    this.listenToGameStart();
    this.listenToGameEnd();
    this.listenToPlayersActivity();
  }

  ngOnDestroy() {
    if (this.gameStarted) return;
    this.roomService.leaveRoom();
  }

  startGame():void {
    if (this.room.creator !== this.authenticationService.currentUser) return;
    this.apiService.startGame()
      .pipe(take(1))
      .subscribe(response => {
        if (!response.success) {
          const errorMessage = ApiEndpoints.START_GAME.ERRORS.find(ERROR => ERROR.CODE === response.data)?.MESSAGE;
          this.alertService.displayAlert({
            type: AlertType.Error,
            title: 'Failed To Start The Game',
            subtitle: errorMessage ?? 'Failed To Start The Game Due To Unknown Error',
            timeout: 7000
          });
        }
      });
  }

  private listenToGameStart():void {
    this.signalr.listen<void>(ApiEndpoints.START_GAME.RECIEVE)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.gameStarted = true;
        this.room.currentRound = 1;
        this.router.navigate(['/room/game-room']);
      });
  }

  private listenToGameEnd():void {
    this.signalr.listen<void>(ApiEndpoints.GAME_ENDED.RECIEVE)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.alertService.displayAlert({
          type: AlertType.Warning,
          title: 'Room Closed',
          subtitle: 'The game has ended because the room creator left the room.',
          timeout: 7000
        });
        this.roomService.leaveRoom();
        this.router.navigate(['/']);
      });
  }

  private listenToPlayersActivity():void {
    this.signalr.listen<string>(ApiEndpoints.PLAYER_LEFT.RECIEVE)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(username => {
        const userIndex = this.room.joinedUsers.findIndex(user => user.username === username);
        if (userIndex !== -1) this.room.joinedUsers.splice(userIndex, 1);
      });
    
    this.signalr.listen<string>(ApiEndpoints.PLAYER_JOINED.RECIEVE)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(username => {
        if (!this.room.joinedUsers.some(user => user.username === username)) {
          this.room.joinedUsers.push(this.userService.getOrCreateUser(username));
        }
      });
  }
}
