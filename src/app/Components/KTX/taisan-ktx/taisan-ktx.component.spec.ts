import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaisanKtxComponent } from './taisan-ktx.component';

describe('TaisanKtxComponent', () => {
  let component: TaisanKtxComponent;
  let fixture: ComponentFixture<TaisanKtxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaisanKtxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaisanKtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
