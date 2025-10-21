import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCarousel } from './category-carousel';

describe('CategoryCarousel', () => {
  let component: CategoryCarousel;
  let fixture: ComponentFixture<CategoryCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
