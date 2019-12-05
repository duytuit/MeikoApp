import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMalotComponent } from './filter-malot.component';

describe('FilterMalotComponent', () => {
  let component: FilterMalotComponent;
  let fixture: ComponentFixture<FilterMalotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMalotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMalotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
