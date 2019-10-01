import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkeMa5V1Component } from './thongke-ma5-v1.component';

describe('ThongkeMa5V1Component', () => {
  let component: ThongkeMa5V1Component;
  let fixture: ComponentFixture<ThongkeMa5V1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkeMa5V1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkeMa5V1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
