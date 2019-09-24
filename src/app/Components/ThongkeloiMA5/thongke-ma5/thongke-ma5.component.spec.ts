import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkeMA5Component } from './thongke-ma5.component';

describe('ThongkeMA5Component', () => {
  let component: ThongkeMA5Component;
  let fixture: ComponentFixture<ThongkeMA5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkeMA5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkeMA5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
