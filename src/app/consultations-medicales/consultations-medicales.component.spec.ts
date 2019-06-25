import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsMedicalesComponent } from './consultations-medicales.component';

describe('ConsultationsMedicalesComponent', () => {
  let component: ConsultationsMedicalesComponent;
  let fixture: ComponentFixture<ConsultationsMedicalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationsMedicalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationsMedicalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
