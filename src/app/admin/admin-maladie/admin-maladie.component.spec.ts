import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMaladieComponent } from './admin-maladie.component';

describe('AdminMaladieComponent', () => {
  let component: AdminMaladieComponent;
  let fixture: ComponentFixture<AdminMaladieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMaladieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMaladieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
