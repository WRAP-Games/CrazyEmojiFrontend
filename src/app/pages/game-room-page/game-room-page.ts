import { Component, DestroyRef, inject } from '@angular/core';
import { NavbarService } from '../../services/navbar-service';
import { AlertService } from '../../services/alert-service';
import { Signalr } from '../../services/signalr';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room-service';
import { AlertI, AlertType, ButtonSize, ComponentIcon, ComponentIconPosition, Room, RoomRole } from '../../../definitions';
import { Subscription, take, timer } from 'rxjs';
import { ApiRecieveCommands, ApiSendCommands } from '../../../apiEndpoints';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingBarService, NgxLoadingBar } from "@ngx-loading-bar/core";
import { InputField } from "../../components/input-field/input-field";
import { Button } from "../../components/button/button";

@Component({
  selector: 'app-game-room-page',
  imports: [NgxLoadingBar, InputField, Button],
  templateUrl: './game-room-page.html',
  styleUrl: './game-room-page.scss'
})
export class GameRoomPage {
  private navbarService: NavbarService = inject(NavbarService);
  private alertService: AlertService = inject(AlertService);
  private signalr = inject(Signalr);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private loadingBar: LoadingBarService = inject(LoadingBarService);
  private roomService: RoomService = inject(RoomService);

  readonly RoomRole = RoomRole;
  readonly ButtonSize = ButtonSize;
  readonly SendBtnIcon: ComponentIcon = {
    icon: 'fa-solid fa-paper-plane',
    position: ComponentIconPosition.Right
  };
  readonly CommanderAlert: AlertI = {
    type: AlertType.Success,
    title: 'You are the Picker',
    subtitle: `
      Pick emojis that represent the given word best and let other players guess it.
      TIP: don’t make it too easy or difficult because you will loose points.
    `,
    timeout: 15000
  };
  readonly GuesserAlert: AlertI = {
    type: AlertType.Success,
    title: 'You are the Guesser',
    subtitle: 'Guess the word based on given emojis.',
    timeout: 15000
  };
  readonly CorrectGuessAlert: AlertI = {
    type: AlertType.Success,
    title: 'Your guess is correct.',
    subtitle: 'Your guess is correct.',
    timeout: 15000
  };
  readonly IncorrectGuessAlert: AlertI = {
    type: AlertType.Error,
    title: 'Your guess is incorrect.',
    subtitle: 'Your guess is incorrect.',
    timeout: 15000
  };
  readonly RoomNotFoundAlert: AlertI = {
    type: AlertType.Error,
    title: 'Room Not Found',
    subtitle: 'Room Not Found'
  };

  room!: Room;
  roomRole?: RoomRole;
  inputValue: string = '';
  recievedWordOrEmoji?: string;
  loadingScreenTitle: string = '';

  overlayEnabled: boolean = false;
  overlayStartExitAnimation: boolean = false;

  ngOnInit() {
    if (!this.roomService.currentRoom) {
      this.alertService.displayAlert(this.RoomNotFoundAlert);
      this.router.navigate(['/']);
      return;
    }
    this.room = this.roomService.currentRoom;
    this.navbarService.disableNavbar();
    this.startRound();
  }

  onInputFieldEnter(value: string):void {
    this.inputValue = value;
  }

  submitGuess():void {
    if (this.roomRole === undefined || !this.inputValue.length) return;
    if (this.roomRole === RoomRole.Guesser) {
      this.signalr.sendMessage(ApiSendCommands.CHECK_WORD, this.inputValue);
      this.loadingScreenTitle = 'Please wait for all players to submit their guesses';
      this.listenForGuessResult();
    } else {
      this.signalr.sendMessage(ApiSendCommands.GET_AND_SEND_EMOJIS, this.inputValue);
      this.loadingScreenTitle = 'Please wait for players to submit their guesses';
    }
  }

  private startRound():void {
    this.inputValue = '';
    this.roomRole = undefined;
    this.recievedWordOrEmoji = undefined;
    this.loadingScreenTitle = 'Please wait for the round to start';
    this.loadingBar.start();
    this.listenToCommanderSelection();
    this.listenForRoundEnd();
  }

  private listenToCommanderSelection():void {
    let commanderSelectedSub: Subscription;
    let commanderAnnouncedSub: Subscription;

    commanderSelectedSub = this.signalr.listen<string>(ApiRecieveCommands.COMMANDER_SELECTED)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(msg => {
        this.listenForWord();
        commanderAnnouncedSub.unsubscribe();
        this.roomRole = RoomRole.Commander;
        this.displayOverlay();
      });
    
    commanderAnnouncedSub = this.signalr.listen<string>(ApiRecieveCommands.COMMANDER_ANNOUNCED)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(msg => {
        this.listenForEmojis();
        commanderSelectedSub.unsubscribe();
        this.roomRole = RoomRole.Guesser;
        this.loadingScreenTitle = 'Wait for the commander to submit emojis';
        this.displayOverlay();
      });
  }

  private listenForWord():void {
    this.signalr.listen<string>(ApiRecieveCommands.RECIEVE_WORD)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(word => {
        this.recievedWordOrEmoji = word;
        this.loadingScreenTitle = '';
        this.loadingBar.complete();
      });
  }

  private listenForEmojis():void {
    this.signalr.listen<string>(ApiRecieveCommands.RECIEVE_EMOJIS)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(emojis => {
        this.recievedWordOrEmoji = emojis;
        this.loadingScreenTitle = '';
        this.loadingBar.complete();
      });
  }

  private listenForGuessResult():void {
    let correctAnswerdSub: Subscription;
    let incorrectAnswerdSub: Subscription;

    correctAnswerdSub = this.signalr.listen<string>(ApiRecieveCommands.CORRECT_GUESS)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(pinCode => {
        incorrectAnswerdSub.unsubscribe();
        this.alertService.displayAlert(this.CorrectGuessAlert);
        this.loadingScreenTitle = 'Please wait for all players to submit their guesses';
        this.loadingBar.start();
      });
    incorrectAnswerdSub = this.signalr.listen<string>(ApiRecieveCommands.INCORRECT_GUESS)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(pinCode => {
        correctAnswerdSub.unsubscribe();
        this.alertService.displayAlert(this.IncorrectGuessAlert);
        this.loadingScreenTitle = 'Please wait for all players to submit their guesses';
        this.loadingBar.start();
      });
  }

  private listenForRoundEnd():void {
    this.signalr.listen<string>(ApiRecieveCommands.ROUND_ENDED)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe(msg => {
        if (this.room.currentRound) this.room.currentRound += 1;
        this.startRound();
      });
  }

  private displayOverlay():void {
    this.overlayEnabled = true;
    timer(5000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.overlayStartExitAnimation = true;
      timer(500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.overlayEnabled = false;
        this.overlayStartExitAnimation = false;
      })
    });
  }
}
