import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOrientationMedicaleComponent } from './ajouter-orientation-medicale.component';

describe('AjouterOrientationMedicaleComponent', () => {
  let component: AjouterOrientationMedicaleComponent;
  let fixture: ComponentFixture<AjouterOrientationMedicaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterOrientationMedicaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterOrientationMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
