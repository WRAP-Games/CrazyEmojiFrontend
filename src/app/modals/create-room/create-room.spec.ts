import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoom } from './create-room';

describe('CreateRoom', () => {
  let component: CreateRoom;
  let fixture: ComponentFixture<CreateRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
