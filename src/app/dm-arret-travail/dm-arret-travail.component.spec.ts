import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmArretTravailComponent } from './dm-arret-travail.component';

describe('DmArretTravailComponent', () => {
  let component: DmArretTravailComponent;
  let fixture: ComponentFixture<DmArretTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmArretTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmArretTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
