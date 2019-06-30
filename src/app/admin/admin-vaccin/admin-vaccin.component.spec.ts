import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVaccinComponent } from './admin-vaccin.component';

describe('AdminVaccinComponent', () => {
  let component: AdminVaccinComponent;
  let fixture: ComponentFixture<AdminVaccinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVaccinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVaccinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
