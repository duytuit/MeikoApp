import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodungcanhanComponent } from './dodungcanhan.component';

describe('DodungcanhanComponent', () => {
  let component: DodungcanhanComponent;
  let fixture: ComponentFixture<DodungcanhanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodungcanhanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodungcanhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
