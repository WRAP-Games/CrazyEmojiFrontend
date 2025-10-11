import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-widget',
  imports: [],
  templateUrl: './category-widget.html',
  styleUrl: './category-widget.scss'
})
export class CategoryWidget {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) description!: string;
}
