import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMedicamentComponent } from './admin-medicament.component';

describe('AdminMedicamentComponent', () => {
  let component: AdminMedicamentComponent;
  let fixture: ComponentFixture<AdminMedicamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMedicamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMedicamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
