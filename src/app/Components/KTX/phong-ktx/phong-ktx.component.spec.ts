import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongKtxComponent } from './phong-ktx.component';

describe('PhongKtxComponent', () => {
  let component: PhongKtxComponent;
  let fixture: ComponentFixture<PhongKtxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongKtxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongKtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
