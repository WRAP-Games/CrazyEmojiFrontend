import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinRoomBanner } from './join-room-banner';

describe('JoinRoomBanner', () => {
  let component: JoinRoomBanner;
  let fixture: ComponentFixture<JoinRoomBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinRoomBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinRoomBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
