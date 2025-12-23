import { Component, inject } from '@angular/core';
import { NavbarContent, User } from '../../../definitions';
import { NavbarService } from '../../services/navbar-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserProfileImg } from "../user-profile-img/user-profile-img";
import { Authentication } from '../../services/authentication';

@Component({
  selector: 'app-navbar',
  imports: [UserProfileImg],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private navbarService: NavbarService = inject(NavbarService);
  
  authenticationService: Authentication = inject(Authentication);
  contents: NavbarContent[] | null = null;

  constructor() {
    this.navbarService.navbarContent$.pipe(takeUntilDestroyed()).subscribe(contents => {
      this.contents = contents;
    })
  }
}
