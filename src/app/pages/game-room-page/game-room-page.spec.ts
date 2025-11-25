import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomPage } from './game-room-page';

describe('GameRoomPage', () => {
  let component: GameRoomPage;
  let fixture: ComponentFixture<GameRoomPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameRoomPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
