import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { environment } from '../environment';
import { SidebarNavigation } from "./components/sidebar-navigation/sidebar-navigation";
import { NgxLoadingBar } from '@ngx-loading-bar/core';
import { Navbar } from "./components/navbar/navbar";
import { NavbarService } from './services/navbar-service';
import { NavbarContentColor } from '../definitions';
import { filter } from 'rxjs';
import { Authentication } from './services/authentication';
import { AuthenticationPage } from "./pages/authentication-page/authentication-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarNavigation, NgxLoadingBar, Navbar, AuthenticationPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  private navbarService: NavbarService = inject(NavbarService);
  authenticationService: Authentication = inject(Authentication);

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
  }

  private setNavbarTitle():void {
    if (!this.authenticationService.currentUserLoggedIn) return;
    this.navbarService.setNavbarConent([
      {
        content: this.getWelcomeMessage() + ',',
        color: NavbarContentColor.Secondary
      },
      {
        content: this.authenticationService.currentUser.username,
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
}
