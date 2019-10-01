import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveListMa5Component } from './remove-list-ma5.component';

describe('RemoveListMa5Component', () => {
  let component: RemoveListMa5Component;
  let fixture: ComponentFixture<RemoveListMa5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveListMa5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveListMa5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
