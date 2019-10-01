import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Congdoan1V1Component } from './congdoan1-v1.component';

describe('Congdoan1V1Component', () => {
  let component: Congdoan1V1Component;
  let fixture: ComponentFixture<Congdoan1V1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Congdoan1V1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Congdoan1V1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
