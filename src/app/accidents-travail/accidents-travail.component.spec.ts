import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccidentsTravailComponent } from './accidents-travail.component';

describe('AccidentsTravailComponent', () => {
  let component: AccidentsTravailComponent;
  let fixture: ComponentFixture<AccidentsTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccidentsTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccidentsTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
