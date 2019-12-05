import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogKtxComponent } from './dialog-ktx.component';

describe('DialogKtxComponent', () => {
  let component: DialogKtxComponent;
  let fixture: ComponentFixture<DialogKtxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogKtxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogKtxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
