import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFriends } from './sidebar-friends';

describe('SidebarFriends', () => {
  let component: SidebarFriends;
  let fixture: ComponentFixture<SidebarFriends>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFriends]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarFriends);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
