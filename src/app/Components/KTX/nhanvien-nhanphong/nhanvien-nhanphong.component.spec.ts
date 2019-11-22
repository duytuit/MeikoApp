import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanvienNhanphongComponent } from './nhanvien-nhanphong.component';

describe('NhanvienNhanphongComponent', () => {
  let component: NhanvienNhanphongComponent;
  let fixture: ComponentFixture<NhanvienNhanphongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhanvienNhanphongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanvienNhanphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
