import { Component } from '@angular/core';
import { Category } from '../../../definitions';
import { CategoryCarousel } from "../../components/category-carousel/category-carousel";
import { RouterLink } from '@angular/router';
import { categories } from '../../../testData';
import { JoinRoomBanner } from "../../components/join-room-banner/join-room-banner";

@Component({
  selector: 'app-home-page',
  imports: [CategoryCarousel, RouterLink, JoinRoomBanner],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  categories: Category[] = categories;
}
