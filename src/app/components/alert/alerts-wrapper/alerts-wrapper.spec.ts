import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsWrapper } from './alerts-wrapper';

describe('AlertsWrapper', () => {
  let component: AlertsWrapper;
  let fixture: ComponentFixture<AlertsWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertsWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
