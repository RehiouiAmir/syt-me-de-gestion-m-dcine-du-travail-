import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPosteTravailComponent } from './admin-poste-travail.component';

describe('AdminPosteTravailComponent', () => {
  let component: AdminPosteTravailComponent;
  let fixture: ComponentFixture<AdminPosteTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPosteTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPosteTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
