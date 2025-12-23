import { Component, DestroyRef, inject } from '@angular/core';
import { Authentication } from '../../services/authentication';
import { Storage } from '../../services/storage';
import { InputField } from "../../components/input-field/input-field";
import { Button } from "../../components/button/button";
import { AlertType, ComponentIcon, ComponentIconPosition, InputFieldColor, StorageKeys } from '../../../definitions';
import { AlertService } from '../../services/alert-service';
import { Signalr } from '../../services/signalr';
import { ApiEndpoints } from '../../../apiEndpoints';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

@Component({
  selector: 'app-authentication-page',
  imports: [InputField, Button],
  templateUrl: './authentication-page.html',
  styleUrl: './authentication-page.scss'
})
export class AuthenticationPage {
  private destroyRef = inject(DestroyRef);
  private signalr: Signalr = inject(Signalr);
  private storageService: Storage = inject(Storage);
  private alertService: AlertService = inject(AlertService);
  private authenticationService: Authentication = inject(Authentication);

  readonly InputFieldColor = InputFieldColor;
  readonly LoginButtonIcon: ComponentIcon = {
    icon: 'fa-solid fa-arrow-right',
    position: ComponentIconPosition.Right
  };

  isAuthenticationInProgress: boolean = false;
  authenticationMethod: 'login' | 'signup' = 'signup';
  username: string = '';
  password: string = '';

  ngOnInit() {
    this.detectPreviousLogin();
  }

  onUsernameEnter(username: string):void {
    this.username = username;
  }

  onPasswordEnter(password: string):void {
    this.password = password;
  }

  login() {
    if (!this.username.length || !this.password.length) return;
    this.isAuthenticationInProgress = true;
    this.signalr.listenToError(ApiEndpoints.LOGIN.SEND)
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.isAuthenticationInProgress = false;
        this.alertService.displayAlert({
          type: AlertType.Error,
          title: 'Incorrect Username Or Password',
          subtitle: ApiEndpoints.LOGIN.ERRORS[0].MESSAGE,
          timeout: 7000
        });
      });
    this.authenticationService.login(this.username, this.password);
  }

  signup() {
    if (!this.username.length || !this.password.length) return;
    this.isAuthenticationInProgress = true;
    this.signalr.listenToError(ApiEndpoints.SIGN_UP.SEND)
      .pipe(take(1))
      .subscribe(errorCode => {
        this.isAuthenticationInProgress = false;
        const errorMessage = ApiEndpoints.SIGN_UP.ERRORS.find(ERROR => ERROR.CODE === errorCode)?.MESSAGE;
        this.alertService.displayAlert({
          type: AlertType.Error,
          title: 'Sign Up Failed',
          subtitle: errorMessage ?? 'Sign Up Failed Due To Unknown Error',
          timeout: 7000
        });
      });
    this.authenticationService.signup(this.username, this.password);
  }

  detectPreviousLogin():void {
    const username: string | undefined = this.storageService.getFromStorage(StorageKeys.Username, undefined);
    const password: string | undefined = this.storageService.getFromStorage(StorageKeys.Password, undefined);
    console.log('detectPreviousLogin', 'username', username, 'password', password);
    
    if (username && password) {
      this.authenticationService.login(username, password);
    }
    else if (username) {
      this.authenticationMethod = 'login';
    }
    else {
      this.authenticationMethod = 'signup';
    }
  }
}
