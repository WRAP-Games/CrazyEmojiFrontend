import { Component } from '@angular/core';
import { CategoryWidget } from "../../components/category-widget/category-widget";
import { Category } from '../../../definitions';

@Component({
  selector: 'app-home-page',
  imports: [CategoryWidget],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {
  categories: Category[] = [
    {
      name: 'Movies',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category1.jpg',
      requiredLevel: 0
    },
    {
      name: 'Characters',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category2.jpg',
      requiredLevel: 0
    },
    {
      name: 'Songs',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category3.jpg',
      requiredLevel: 0
    },
    {
      name: 'TV Shows',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category4.jpg',
      requiredLevel: 0
    },
    {
      name: 'Books',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category5.jpg',
      requiredLevel: 0
    },
    {
      name: 'Video Games',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category6.jpg',
      requiredLevel: 0
    },
    {
      name: 'Animals',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category7.jpg',
      requiredLevel: 0
    },
    {
      name: 'Foods And Drinks',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category8.jpg',
      requiredLevel: 0
    },
    {
      name: 'Sports',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category9.jpg',
      requiredLevel: 0
    },
    {
      name: 'Countries',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/categories/category10.jpg',
      requiredLevel: 0
    }
  ]
}
