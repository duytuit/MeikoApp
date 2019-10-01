import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Congdoan2V1Component } from './congdoan2-v1.component';

describe('Congdoan2V1Component', () => {
  let component: Congdoan2V1Component;
  let fixture: ComponentFixture<Congdoan2V1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Congdoan2V1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Congdoan2V1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
