import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Congdoan1Component } from './congdoan1.component';

describe('Congdoan1Component', () => {
  let component: Congdoan1Component;
  let fixture: ComponentFixture<Congdoan1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Congdoan1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Congdoan1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
