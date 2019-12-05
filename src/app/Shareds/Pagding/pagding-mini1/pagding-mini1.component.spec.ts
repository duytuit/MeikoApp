import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagdingMini1Component } from './pagding-mini1.component';

describe('PagdingMini1Component', () => {
  let component: PagdingMini1Component;
  let fixture: ComponentFixture<PagdingMini1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagdingMini1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagdingMini1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
