import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmExplorationsComponent } from './dm-explorations.component';

describe('DmExplorationsComponent', () => {
  let component: DmExplorationsComponent;
  let fixture: ComponentFixture<DmExplorationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmExplorationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmExplorationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
