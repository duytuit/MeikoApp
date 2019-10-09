import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMalotMa5Component } from './filter-malot-ma5.component';

describe('FilterMalotMa5Component', () => {
  let component: FilterMalotMa5Component;
  let fixture: ComponentFixture<FilterMalotMa5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMalotMa5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMalotMa5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
