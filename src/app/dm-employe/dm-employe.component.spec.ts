import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmEmployeComponent } from './dm-employe.component';

describe('DmEmployeComponent', () => {
  let component: DmEmployeComponent;
  let fixture: ComponentFixture<DmEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
