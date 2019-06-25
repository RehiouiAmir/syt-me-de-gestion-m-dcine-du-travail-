import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmChangementPosteComponent } from './dm-changement-poste.component';

describe('DmChangementPosteComponent', () => {
  let component: DmChangementPosteComponent;
  let fixture: ComponentFixture<DmChangementPosteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmChangementPosteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmChangementPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
