import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterVisiteMedicaleComponent } from './ajouter-visite-medicale.component';

describe('AjouterVisiteMedicaleComponent', () => {
  let component: AjouterVisiteMedicaleComponent;
  let fixture: ComponentFixture<AjouterVisiteMedicaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterVisiteMedicaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterVisiteMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
