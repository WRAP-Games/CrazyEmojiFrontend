import { Component, DestroyRef, inject } from '@angular/core';
import { NavbarService } from '../../services/navbar-service';
import { AlertService } from '../../services/alert-service';
import { Signalr } from '../../services/signalr';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room-service';
import { AlertType, ButtonSize, ComponentIcon, ComponentIconPosition, Room, RoomRole } from '../../../definitions';
import { take, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputField } from "../../components/input-field/input-field";
import { Button } from "../../components/button/button";
import { ApiEndpoints, RoundResultsPayload } from '../../../apiEndpoints';
import { InputFieldEmojis } from "../../components/input-field-emojis/input-field-emojis";
import { ApiService } from '../../services/api-service';
import { Authentication } from '../../services/authentication';
import { NgScrollbar } from "ngx-scrollbar";

@Component({
  selector: 'app-game-room-page',
  imports: [InputField, Button, InputFieldEmojis, NgScrollbar],
  templateUrl: './game-room-page.html',
  styleUrl: './game-room-page.scss'
})
export class GameRoomPage {
  private navbarService: NavbarService = inject(NavbarService);
  private alertService: AlertService = inject(AlertService);
  private signalr = inject(Signalr);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private roomService: RoomService = inject(RoomService);
  private apiService: ApiService = inject(ApiService);
  private authenticationService: Authentication = inject(Authentication);

  readonly RoomRole = RoomRole;
  readonly ButtonSize = ButtonSize;
  readonly SendBtnIcon: ComponentIcon = {
    icon: 'fa-solid fa-paper-plane',
    position: ComponentIconPosition.Right
  };

  room!: Room;
  roomRole?: RoomRole;
  inputValue: string = '';
  recievedWordOrEmoji?: string;
  loadingScreenTitle: string = '';
  showTimer: boolean = false;
  roundResults?: RoundResultsPayload[];

  overlayEnabled: boolean = false;
  overlayStartExitAnimation: boolean = false;

  ngOnInit() {
    if (!this.roomService.currentRoom) {
      this.router.navigate(['/']);
      return;
    }
    this.room = this.roomService.currentRoom;
    this.navbarService.disableNavbar();
    this.startRound();
  }

  ngOnDestroy() {
    this.roomService.leaveRoom();
  }

  private startRound():void {
    this.inputValue = '';
    this.roomRole = undefined;
    this.recievedWordOrEmoji = undefined;
    this.roundResults = undefined;
    this.loadingScreenTitle = 'Please wait for the round to start';
    this.getRoundCommander();
  }

  private getRoundCommander():void {
    this.apiService.getCommander()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        if (response.success) {
          if (response.data.username === this.authenticationService.currentUser.username) {
            this.roomRole = RoomRole.Commander;
            this.displayOverlay();
            this.listenForWord();
          } else {
            this.loadingScreenTitle = 'Please wait for commander to select emojis';
            this.roomRole = RoomRole.Guesser;
            this.displayOverlay();
            this.listenForEmojis();
          }
        } else {
          const errorMessage = ApiEndpoints.GET_COMMANDER.ERRORS.find(ERROR => ERROR.CODE === response.data)?.MESSAGE;
          this.alertService.displayAlert({
            type: AlertType.Error,
            title: 'Failed To Get Round Commander',
            subtitle: errorMessage ?? 'Failed To Get Round Commander Due To Unknown Error',
            timeout: 7000
          });
        }
      });
  }

  private listenForWord():void {
    this.apiService.getWord()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        if (response.success) {
          this.recievedWordOrEmoji = response.data;
          this.loadingScreenTitle = '';
        } else {
          const errorMessage = ApiEndpoints.GET_WORD.ERRORS.find(ERROR => ERROR.CODE === response.data)?.MESSAGE;
          this.alertService.displayAlert({
            type: AlertType.Error,
            title: 'Failed To Get Round Word',
            subtitle: errorMessage ?? 'Failed To Get Round Word Due To Unknown Error',
            timeout: 7000
          });
        }
      });
  }

  private listenForEmojis():void {
    this.signalr.listen<string>(ApiEndpoints.RECIEVE_EMOJIS.RECIEVE)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(emojis => {
        this.recievedWordOrEmoji = emojis;
        this.loadingScreenTitle = '';
        this.getResultsWithTimer();
      });
  }

  onInputFieldEnter(event: Event):void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = value;
  }

  submitEmojis(emojis: string) {
    this.inputValue = emojis;
    this.submitGuess();
  }

  submitGuess():void {
    if (this.roomRole === undefined || !this.inputValue.length) return;
    if (this.roomRole === RoomRole.Guesser) {
      this.loadingScreenTitle = 'Please wait for all players to submit their guesses';
      console.log('this.inputValue', this.inputValue);
      this.apiService.checkWord(this.inputValue)
        .pipe(take(1), takeUntilDestroyed(this.destroyRef))
        .subscribe(response => {
          if (response.success) {
            console.log('word is checked. result:', response.data);
          } else {
            const errorMessage = ApiEndpoints.CHECK_WORD.ERRORS.find(ERROR => ERROR.CODE === response.data)?.MESSAGE;
            this.alertService.displayAlert({
              type: AlertType.Error,
              title: 'Failed To Check Guess',
              subtitle: errorMessage ?? 'Failed To Check Guess Due To Unknown Error',
              timeout: 7000
            });
          }
        });
    } else {
      this.loadingScreenTitle = 'Please wait for players to submit their guesses';
      this.apiService.sendEmojis(this.inputValue)
        .pipe(take(1), takeUntilDestroyed(this.destroyRef))
        .subscribe(response => {
          if (!response.success) {
            const errorMessage = ApiEndpoints.SEND_EMOJIS.ERRORS.find(ERROR => ERROR.CODE === response.data)?.MESSAGE;
            this.alertService.displayAlert({
              type: AlertType.Error,
              title: 'Failed To Send Emojis',
              subtitle: errorMessage ?? 'Failed To Send Emojis Due To Unknown Error',
              timeout: 7000
            });
          } else {
            this.getResultsWithTimer();
          }
        });
    }
  }

  private getResultsWithTimer():void {
    const timerDuration = this.room.roundDuration * 1000;
    this.showTimer = true;
    timer(timerDuration).subscribe(() => {
      this.showTimer = false;
      this.getRoundResults();
      this.listenForRoundStart();
    });
  }

  private getRoundResults():void {
    this.apiService.getResults()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        if (response.success) {
          this.roundResults = response.data;
          this.loadingScreenTitle = '';
        } else {
          const errorMessage = ApiEndpoints.GET_RESULTS.ERRORS.find(ERROR => ERROR.CODE === response.data)?.MESSAGE;
          this.alertService.displayAlert({
            type: AlertType.Error,
            title: 'Failed To Get Round Results',
            subtitle: errorMessage ?? 'Failed To Get Round Results Due To Unknown Error',
            timeout: 7000
          });
        }
        if (this.room.currentRound === this.room.rounds) {
          timer(10000)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.roomService.leaveRoom();
              this.router.navigate(['/']);
            });
        }
      });
  }

  private listenForRoundStart():void {
    this.signalr.listen<string>(ApiEndpoints.ROUND_STARTED.RECIEVE)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(msg => {
        if (this.room.currentRound) this.room.currentRound += 1;
        this.startRound();
      });
  }

  private displayOverlay():void {
    this.overlayEnabled = true;
    timer(7000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.overlayStartExitAnimation = true;
      timer(500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.overlayEnabled = false;
        this.overlayStartExitAnimation = false;
      })
    });
  }
}
