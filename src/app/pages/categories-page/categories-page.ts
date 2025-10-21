import { Component, inject } from '@angular/core';
import { Category, NavbarContentColor } from '../../../definitions';
import { CategoryWidget } from "../../components/category-widget/category-widget";
import { NavbarService } from '../../services/navbar-service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { categories } from '../../../testData';

@Component({
  selector: 'app-categories-page',
  imports: [CategoryWidget, NgScrollbarModule],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss'
})
export class CategoriesPage {
  private navbarService: NavbarService = inject(NavbarService);
  categories: Category[] = categories;

  ngOnInit() {
    this.navbarService.setNavbarConent([
      {
        content: "Categories",
        color: NavbarContentColor.Primary
      }
    ])
  }
}
