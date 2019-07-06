import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActeComponent } from './admin-acte.component';

describe('AdminActeComponent', () => {
  let component: AdminActeComponent;
  let fixture: ComponentFixture<AdminActeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminActeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminActeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
