import { Component } from '@angular/core';
import { Category } from '../../../definitions';
import { CategoryCarousel } from "../../components/category-carousel/category-carousel";
import { RouterLink } from '@angular/router';
import { categories } from '../../../testData';

@Component({
  selector: 'app-home-page',
  imports: [CategoryCarousel, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  categories: Category[] = categories;
}
