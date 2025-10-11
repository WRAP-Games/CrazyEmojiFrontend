import { Component } from '@angular/core';
import { CategoryWidget } from "../../components/category-widget/category-widget";

@Component({
  selector: 'app-home-page',
  imports: [CategoryWidget],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

}
