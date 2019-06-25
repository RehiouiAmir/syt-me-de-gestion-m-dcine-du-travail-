import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmAntecedentsComponent } from './dm-antecedents.component';

describe('DmAntecedentsComponent', () => {
  let component: DmAntecedentsComponent;
  let fixture: ComponentFixture<DmAntecedentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmAntecedentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmAntecedentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
