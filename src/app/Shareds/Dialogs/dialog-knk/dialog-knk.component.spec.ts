import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogKnkComponent } from './dialog-knk.component';

describe('DialogKnkComponent', () => {
  let component: DialogKnkComponent;
  let fixture: ComponentFixture<DialogKnkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogKnkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogKnkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
