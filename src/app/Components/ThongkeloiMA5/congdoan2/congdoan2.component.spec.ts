import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Congdoan2Component } from './congdoan2.component';

describe('Congdoan2Component', () => {
  let component: Congdoan2Component;
  let fixture: ComponentFixture<Congdoan2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Congdoan2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Congdoan2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
