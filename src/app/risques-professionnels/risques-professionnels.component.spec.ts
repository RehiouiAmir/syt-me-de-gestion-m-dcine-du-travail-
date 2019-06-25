import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RisquesProfessionnelsComponent } from './risques-professionnels.component';

describe('RisquesProfessionnelsComponent', () => {
  let component: RisquesProfessionnelsComponent;
  let fixture: ComponentFixture<RisquesProfessionnelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RisquesProfessionnelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RisquesProfessionnelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
