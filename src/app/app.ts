import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { environment } from '../environment';
import { SidebarNavigation } from "./components/sidebar-navigation/sidebar-navigation";
import { SidebarFriends } from "./components/sidebar-friends/sidebar-friends";
import { NgxLoadingBar } from '@ngx-loading-bar/core';
import { Navbar } from "./components/navbar/navbar";
import { NavbarService } from './services/navbar-service';
import { NavbarContentColor } from '../definitions';
import { filter } from 'rxjs';
import { currentUser, users } from '../testData';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarNavigation, SidebarFriends, NgxLoadingBar, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  private navbarService: NavbarService = inject(NavbarService);

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
}
