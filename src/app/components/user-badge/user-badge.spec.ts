import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBadge } from './user-badge';

describe('UserBadge', () => {
  let component: UserBadge;
  let fixture: ComponentFixture<UserBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBadge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
