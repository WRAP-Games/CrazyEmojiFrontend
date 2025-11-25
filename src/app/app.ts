import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { environment } from '../environment';
import { SidebarNavigation } from "./components/sidebar-navigation/sidebar-navigation";
import { SidebarFriends } from "./components/sidebar-friends/sidebar-friends";
import { NgxLoadingBar } from '@ngx-loading-bar/core';
import { Navbar } from "./components/navbar/navbar";
import { NavbarService } from './services/navbar-service';
import { AlertI, AlertType, NavbarContentColor } from '../definitions';
import { filter, take } from 'rxjs';
import { currentUser, users } from '../testData';
import { ApiRecieveCommands, ApiSendCommands } from '../apiEndpoints';
import { AlertService } from './services/alert-service';
import { Signalr } from './services/signalr';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarNavigation, SidebarFriends, NgxLoadingBar, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  private navbarService: NavbarService = inject(NavbarService);
  private signalr: Signalr = inject(Signalr);
  private alertService: AlertService = inject(AlertService);

  readonly users = users;
  readonly currentUser = currentUser;

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      filter((event: NavigationEnd) => event.urlAfterRedirects === '/')
    )
    .subscribe(() => {
      this.setNavbarTitle();
    });
  }

  ngOnInit() {
    this.setNavbarTitle();
    this.subscribeToErrors();
  }

  private setNavbarTitle():void {
    this.navbarService.setNavbarConent([
      {
        content: this.getWelcomeMessage() + ',',
        color: NavbarContentColor.Secondary
      },
      {
        content: this.currentUser.firstName,
        color: NavbarContentColor.Primary
      }
    ]);
  }

  private getWelcomeMessage():string {
    const currentHour = new Date().getHours();
    let message = environment.homePageFallbackWelcomeMessage;
    for (const welcomeMesage of environment.homePageWelcomeMessages) {
      if (welcomeMesage.from <= currentHour && currentHour < welcomeMesage.to) {
        message = welcomeMesage.message;
        break;
      }
    }
    return message;
  }

  private subscribeToErrors():void {
    this.signalr.listen<string>(ApiRecieveCommands.ERROR)
      .pipe(take(1))
      .subscribe(error => {
        const alert: AlertI = {
          type: AlertType.Error,
          title: 'Error',
          subtitle: error,
          timeout: 10000
        };
        this.alertService.displayAlert(alert);
      });
  }
}
