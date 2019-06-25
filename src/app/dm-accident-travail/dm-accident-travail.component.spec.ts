import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmAccidentTravailComponent } from './dm-accident-travail.component';

describe('DmAccidentTravailComponent', () => {
  let component: DmAccidentTravailComponent;
  let fixture: ComponentFixture<DmAccidentTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmAccidentTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmAccidentTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
