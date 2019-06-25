import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitesMedicalesComponent } from './visites-medicales.component';

describe('VisitesMedicalesComponent', () => {
  let component: VisitesMedicalesComponent;
  let fixture: ComponentFixture<VisitesMedicalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitesMedicalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitesMedicalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
