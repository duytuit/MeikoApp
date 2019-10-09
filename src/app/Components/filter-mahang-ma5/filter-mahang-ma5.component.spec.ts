import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMahangMa5Component } from './filter-mahang-ma5.component';

describe('FilterMahangMa5Component', () => {
  let component: FilterMahangMa5Component;
  let fixture: ComponentFixture<FilterMahangMa5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMahangMa5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMahangMa5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
