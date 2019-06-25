import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretsTravailComponent } from './arrets-travail.component';

describe('ArretsTravailComponent', () => {
  let component: ArretsTravailComponent;
  let fixture: ComponentFixture<ArretsTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArretsTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArretsTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
