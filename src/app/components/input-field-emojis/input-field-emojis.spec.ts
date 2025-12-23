import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldEmojis } from './input-field-emojis';

describe('InputFieldEmojis', () => {
  let component: InputFieldEmojis;
  let fixture: ComponentFixture<InputFieldEmojis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldEmojis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFieldEmojis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
