import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmProfilVaccinalComponent } from './dm-profil-vaccinal.component';

describe('DmProfilVaccinalComponent', () => {
  let component: DmProfilVaccinalComponent;
  let fixture: ComponentFixture<DmProfilVaccinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmProfilVaccinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmProfilVaccinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
