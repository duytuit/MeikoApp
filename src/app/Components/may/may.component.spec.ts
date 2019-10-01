import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayComponent } from './may.component';

describe('MayComponent', () => {
  let component: MayComponent;
  let fixture: ComponentFixture<MayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
