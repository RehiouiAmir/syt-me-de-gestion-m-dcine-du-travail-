import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterExamenComplementaireComponent } from './ajouter-examen-complementaire.component';

describe('AjouterExamenComplementaireComponent', () => {
  let component: AjouterExamenComplementaireComponent;
  let fixture: ComponentFixture<AjouterExamenComplementaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterExamenComplementaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterExamenComplementaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
