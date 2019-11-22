import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanvientraphongComponent } from './nhanvientraphong.component';

describe('NhanvientraphongComponent', () => {
  let component: NhanvientraphongComponent;
  let fixture: ComponentFixture<NhanvientraphongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhanvientraphongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanvientraphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
