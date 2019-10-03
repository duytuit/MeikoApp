import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPopupComponent } from './show-popup.component';

describe('ShowPopupComponent', () => {
  let component: ShowPopupComponent;
  let fixture: ComponentFixture<ShowPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
