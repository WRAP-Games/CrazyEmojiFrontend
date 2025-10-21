import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavbarContent } from '../../definitions';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private navbarContent = new BehaviorSubject<NavbarContent[] | null>(null);
  navbarContent$ = this.navbarContent.asObservable();

  setNavbarConent(contents: NavbarContent[]):void {
    this.navbarContent.next(contents);
  }

  disableNavbar():void {
    this.navbarContent.next(null);
  }
}
