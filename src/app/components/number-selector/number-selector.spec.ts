import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSelector } from './number-selector';

describe('NumberSelector', () => {
  let component: NumberSelector;
  let fixture: ComponentFixture<NumberSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
