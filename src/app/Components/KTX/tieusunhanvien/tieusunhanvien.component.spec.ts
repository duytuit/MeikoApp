import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieusunhanvienComponent } from './tieusunhanvien.component';

describe('TieusunhanvienComponent', () => {
  let component: TieusunhanvienComponent;
  let fixture: ComponentFixture<TieusunhanvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieusunhanvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieusunhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
