import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppareilComponent } from './admin-appareil.component';

describe('AdminAppareilComponent', () => {
  let component: AdminAppareilComponent;
  let fixture: ComponentFixture<AdminAppareilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAppareilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppareilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
