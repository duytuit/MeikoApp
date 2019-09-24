import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrinhkyComponent } from './trinhky.component';

describe('TrinhkyComponent', () => {
  let component: TrinhkyComponent;
  let fixture: ComponentFixture<TrinhkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrinhkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrinhkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
