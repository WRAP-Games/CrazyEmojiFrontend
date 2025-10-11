import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWidget } from './category-widget';

describe('CategoryWidget', () => {
  let component: CategoryWidget;
  let fixture: ComponentFixture<CategoryWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
