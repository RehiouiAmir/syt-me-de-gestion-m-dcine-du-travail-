import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmVisiteMedicaleComponent } from './dm-visite-medicale.component';

describe('DmVisiteMedicaleComponent', () => {
  let component: DmVisiteMedicaleComponent;
  let fixture: ComponentFixture<DmVisiteMedicaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmVisiteMedicaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmVisiteMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
