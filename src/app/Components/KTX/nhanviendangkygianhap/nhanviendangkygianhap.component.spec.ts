import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanviendangkygianhapComponent } from './nhanviendangkygianhap.component';

describe('NhanviendangkygianhapComponent', () => {
  let component: NhanviendangkygianhapComponent;
  let fixture: ComponentFixture<NhanviendangkygianhapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhanviendangkygianhapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhanviendangkygianhapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
