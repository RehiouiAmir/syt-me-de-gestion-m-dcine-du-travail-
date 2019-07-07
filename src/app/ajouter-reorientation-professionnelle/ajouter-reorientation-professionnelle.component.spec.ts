import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterReorientationProfessionnelleComponent } from './ajouter-reorientation-professionnelle.component';

describe('AjouterReorientationProfessionnelleComponent', () => {
  let component: AjouterReorientationProfessionnelleComponent;
  let fixture: ComponentFixture<AjouterReorientationProfessionnelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterReorientationProfessionnelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterReorientationProfessionnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
