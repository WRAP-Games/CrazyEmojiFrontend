import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environment';
import { SidebarNavigation } from "./components/sidebar-navigation/sidebar-navigation";
import { SidebarFriends } from "./components/sidebar-friends/sidebar-friends";
import { NgxLoadingBar } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarNavigation, SidebarFriends, NgxLoadingBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  welcomeMessage: string = environment.homePageFallbackWelcomeMessage;

  ngOnInit() {
    this.welcomeMessage = this.getWelcomeMessage();
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
