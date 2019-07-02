import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmConvocationComponent } from './dm-convocation.component';

describe('DmConvocationComponent', () => {
  let component: DmConvocationComponent;
  let fixture: ComponentFixture<DmConvocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmConvocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmConvocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
