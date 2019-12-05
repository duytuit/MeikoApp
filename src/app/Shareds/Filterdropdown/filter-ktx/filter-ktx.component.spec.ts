import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterKtxComponent } from './filter-ktx.component';

describe('FilterKtxComponent', () => {
  let component: FilterKtxComponent;
  let fixture: ComponentFixture<FilterKtxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterKtxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterKtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
