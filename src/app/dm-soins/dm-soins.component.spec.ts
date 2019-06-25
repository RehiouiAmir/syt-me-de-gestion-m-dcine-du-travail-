import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmSoinsComponent } from './dm-soins.component';

describe('DmSoinsComponent', () => {
  let component: DmSoinsComponent;
  let fixture: ComponentFixture<DmSoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmSoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmSoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
