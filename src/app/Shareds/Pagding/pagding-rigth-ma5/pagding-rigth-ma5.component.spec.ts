import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagdingRigthMa5Component } from './pagding-rigth-ma5.component';

describe('PagdingRigthMa5Component', () => {
  let component: PagdingRigthMa5Component;
  let fixture: ComponentFixture<PagdingRigthMa5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagdingRigthMa5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagdingRigthMa5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
