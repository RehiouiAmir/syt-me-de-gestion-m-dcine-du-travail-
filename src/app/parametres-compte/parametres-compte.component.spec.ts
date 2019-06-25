import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresCompteComponent } from './parametres-compte.component';

describe('ParametresCompteComponent', () => {
  let component: ParametresCompteComponent;
  let fixture: ComponentFixture<ParametresCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametresCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
