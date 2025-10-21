import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [],
  templateUrl: './sidebar-navigation.html',
  styleUrl: './sidebar-navigation.scss'
})
export class SidebarNavigation {
  private router = inject(Router);

  navigateToPage(link: string):void {
    this.router.navigate([link]);
  }
}
