import { Component, DestroyRef, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Category, ComponentIcon, ComponentIconPosition } from '../../../definitions';
import { CategoryWidget } from "../category-widget/category-widget";
import { Button } from "../button/button";
import { distinctUntilChanged, fromEventPattern, map, throttleTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface DisplayableCategory {
  category: Category,
  fadeEnabled: boolean
}

@Component({
  selector: 'app-category-carousel',
  imports: [CategoryWidget, Button],
  templateUrl: './category-carousel.html',
  styleUrl: './category-carousel.scss'
})
export class CategoryCarousel {
  @Input({ required: true }) categories!: Category[];
  @ViewChild('categoryCarousel') categoryCarousel!: ElementRef;
  private destroyRef: DestroyRef = inject(DestroyRef);
  private leftCategoryIndex: number = 0;
  private rightCategoryIndex: number = 0;
  displayableCategories: DisplayableCategory[] = [];

  readonly ScrollLeftBtnIcon: ComponentIcon = {
    icon: 'fa-solid fa-chevron-left',
    position: ComponentIconPosition.Left
  };
  readonly ScrollRightBtnIcon: ComponentIcon = {
    icon: 'fa-solid fa-chevron-right',
    position: ComponentIconPosition.Left
  };

  ngAfterViewInit() {
    const categoryCarouselResize$ = fromEventPattern<ResizeObserverEntry[]>(
      handler => {
        const observer = new ResizeObserver(entries => handler(entries));
        observer.observe(this.categoryCarousel.nativeElement);
        return observer;
      },
      (_handler, observer) => observer.disconnect()
    );
    categoryCarouselResize$.pipe(
      map(entries => entries[0].contentRect.width),
      throttleTime(200),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(width => {
      const visibleCategories = this.getVisibleCategories(width - 112);
      if (this.displayableCategories.length) this.updateDisplayableCategoriesList(visibleCategories);
      else this.initDisplayableCategoriesList(visibleCategories);
      console.log('visibleCategories', visibleCategories);
    });
  }

  private initDisplayableCategoriesList(numberOfCategoriesToDisplay: number):void {
    this.leftCategoryIndex = this.categories.length - 1;
    this.rightCategoryIndex = Math.min(numberOfCategoriesToDisplay, this.categories.length - 1);

    this.displayableCategories.push(this.getDisplayableCategory(this.leftCategoryIndex, true));
    for (let i = 0; i < Math.min(numberOfCategoriesToDisplay, this.categories.length); i++) {
      this.displayableCategories.push(this.getDisplayableCategory(i));
    }
    this.displayableCategories.push(this.getDisplayableCategory(this.rightCategoryIndex, true));
  }

  private updateDisplayableCategoriesList(numberOfCategoriesToDisplay: number):void {
    console.log('updateDisplayableCategoriesList called', 'numberOfCategoriesToDisplay', numberOfCategoriesToDisplay, 'displayableCategories.length', this.displayableCategories.length);
    if (numberOfCategoriesToDisplay - this.displayableCategories.length - 2 > 0) {
      console.log('number of categories has increased');
      const increaseAmount = numberOfCategoriesToDisplay - this.displayableCategories.length - 2;
      const increaseAmountOnSide = (increaseAmount / 2) - 1;
      console.log('increaseAmount', increaseAmount, 'increaseAmountOnSide', increaseAmountOnSide);
      this.displayableCategories[0].fadeEnabled = false;
      this.displayableCategories[this.displayableCategories.length - 1].fadeEnabled = false;

      for (let i = 0; i < increaseAmountOnSide; i++) {
        this.shiftLeftCategoryIndex();
        this.displayableCategories.unshift(this.getDisplayableCategory(this.leftCategoryIndex));
      }
      this.shiftLeftCategoryIndex();
      this.displayableCategories.unshift(this.getDisplayableCategory(this.leftCategoryIndex, true));

      for (let i = 0; i < increaseAmountOnSide; i++) {
        this.shiftRightCategoryIndex();
        this.displayableCategories.push(this.getDisplayableCategory(this.rightCategoryIndex));
      }
      this.shiftRightCategoryIndex();
      this.displayableCategories.push(this.getDisplayableCategory(this.rightCategoryIndex, true));
    }

    else if (numberOfCategoriesToDisplay - this.displayableCategories.length - 2 < 0) {
      const descreaseAmount = this.displayableCategories.length - 0;
      const decreaseAmountOnSide = (descreaseAmount / 2) - 1;
    }
  }

  private shiftLeftCategoryIndex():void {
    this.leftCategoryIndex === 0 ? this.categories.length - 1 : this.leftCategoryIndex - 1;
  }

  private shiftRightCategoryIndex():void {
    this.leftCategoryIndex === this.categories.length - 1 ? 0 : this.leftCategoryIndex + 1;
  }

  private getDisplayableCategory(categoryIndex: number, fadeEnabled: boolean = false):DisplayableCategory {
    return {
      category: this.categories[categoryIndex],
      fadeEnabled: fadeEnabled
    } as DisplayableCategory;
  }

  scrollRight():void {
    return;
    this.categoryCarousel.nativeElement.scrollBy({
      left: 250,
      behavior: 'smooth'
    });
  }

  scrollLeft():void {
    return;
    this.categoryCarousel.nativeElement.scrollBy({
      left: -250,
      behavior: 'smooth'
    });
  }

  private getVisibleCategories(categoryCarouselWidth: number):number {
    let visibleCategories = 0;
    let visibleCategoriesWidth = 0;
    let gapBetweenCategories = 15;
    while (categoryCarouselWidth - visibleCategoriesWidth >= 2 * gapBetweenCategories + 440) {
      visibleCategories += 2;
      visibleCategoriesWidth += 2 * gapBetweenCategories + 440;
      if (gapBetweenCategories === 15) gapBetweenCategories = 30;
    }
    return Math.max(visibleCategories, 1);
  }
}
