import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNatureAccidentComponent } from './admin-nature-accident.component';

describe('AdminNatureAccidentComponent', () => {
  let component: AdminNatureAccidentComponent;
  let fixture: ComponentFixture<AdminNatureAccidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNatureAccidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNatureAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
