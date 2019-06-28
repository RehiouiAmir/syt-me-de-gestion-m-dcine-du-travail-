import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOrdonnanceComponent } from './ajouter-ordonnance.component';

describe('AjouterOrdonnanceComponent', () => {
  let component: AjouterOrdonnanceComponent;
  let fixture: ComponentFixture<AjouterOrdonnanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterOrdonnanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
