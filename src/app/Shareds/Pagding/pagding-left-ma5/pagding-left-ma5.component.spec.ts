import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagdingLeftMa5Component } from './pagding-left-ma5.component';

describe('PagdingLeftMa5Component', () => {
  let component: PagdingLeftMa5Component;
  let fixture: ComponentFixture<PagdingLeftMa5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagdingLeftMa5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagdingLeftMa5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
