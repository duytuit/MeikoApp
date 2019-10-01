import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pq1Component } from './pq1.component';

describe('Pq1Component', () => {
  let component: Pq1Component;
  let fixture: ComponentFixture<Pq1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pq1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pq1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
