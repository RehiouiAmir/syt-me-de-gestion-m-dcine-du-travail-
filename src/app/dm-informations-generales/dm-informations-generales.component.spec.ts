import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmInformationsGeneralesComponent } from './dm-informations-generales.component';

describe('DmInformationsGeneralesComponent', () => {
  let component: DmInformationsGeneralesComponent;
  let fixture: ComponentFixture<DmInformationsGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmInformationsGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmInformationsGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
