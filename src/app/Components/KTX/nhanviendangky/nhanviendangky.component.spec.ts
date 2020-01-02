import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanviendangkyComponent } from './nhanviendangky.component';

describe('NhanviendangkyComponent', () => {
  let component: NhanviendangkyComponent;
  let fixture: ComponentFixture<NhanviendangkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhanviendangkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanviendangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
