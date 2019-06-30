import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDepartementComponent } from './admin-departement.component';

describe('AdminDepartementComponent', () => {
  let component: AdminDepartementComponent;
  let fixture: ComponentFixture<AdminDepartementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDepartementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDepartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
