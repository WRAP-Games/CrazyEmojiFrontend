import { Component, inject } from '@angular/core';
import { NavbarContent, User } from '../../../definitions';
import { NavbarService } from '../../services/navbar-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { currentUser } from '../../../testData';
import { UserProfileImg } from "../user-profile-img/user-profile-img";

@Component({
  selector: 'app-navbar',
  imports: [UserProfileImg],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private navbarService: NavbarService = inject(NavbarService);
  contents: NavbarContent[] | null = null;

  readonly currentUser: User = currentUser;

  constructor() {
    this.navbarService.navbarContent$.pipe(takeUntilDestroyed()).subscribe(contents => {
      this.contents = contents;
    })
  }
}
