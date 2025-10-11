import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNavigation } from './sidebar-navigation';

describe('SidebarNavigation', () => {
  let component: SidebarNavigation;
  let fixture: ComponentFixture<SidebarNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
