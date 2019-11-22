import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhainhankhauComponent } from './khainhankhau.component';

describe('KhainhankhauComponent', () => {
  let component: KhainhankhauComponent;
  let fixture: ComponentFixture<KhainhankhauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhainhankhauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhainhankhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
