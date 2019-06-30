import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNatureConsultationComponent } from './admin-nature-consultation.component';

describe('AdminNatureConsultationComponent', () => {
  let component: AdminNatureConsultationComponent;
  let fixture: ComponentFixture<AdminNatureConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNatureConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNatureConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
