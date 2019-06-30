import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSocieteComponent } from './admin-societe.component';

describe('AdminSocieteComponent', () => {
  let component: AdminSocieteComponent;
  let fixture: ComponentFixture<AdminSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
