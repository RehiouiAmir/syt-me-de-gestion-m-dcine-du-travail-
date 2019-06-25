import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmConsultationMedicaleComponent } from './dm-consultation-medicale.component';

describe('DmConsultationMedicaleComponent', () => {
  let component: DmConsultationMedicaleComponent;
  let fixture: ComponentFixture<DmConsultationMedicaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmConsultationMedicaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmConsultationMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
