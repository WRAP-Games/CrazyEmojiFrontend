import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileImg } from './user-profile-img';

describe('UserProfileImg', () => {
  let component: UserProfileImg;
  let fixture: ComponentFixture<UserProfileImg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileImg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileImg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
