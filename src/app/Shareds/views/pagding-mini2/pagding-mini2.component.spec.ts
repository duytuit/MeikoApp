import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagdingMini2Component } from './pagding-mini2.component';

describe('PagdingMini2Component', () => {
  let component: PagdingMini2Component;
  let fixture: ComponentFixture<PagdingMini2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagdingMini2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagdingMini2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
