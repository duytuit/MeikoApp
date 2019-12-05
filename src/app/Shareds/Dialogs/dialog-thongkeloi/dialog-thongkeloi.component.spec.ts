import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogThongkeloiComponent } from './dialog-thongkeloi.component';

describe('DialogThongkeloiComponent', () => {
  let component: DialogThongkeloiComponent;
  let fixture: ComponentFixture<DialogThongkeloiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogThongkeloiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogThongkeloiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
