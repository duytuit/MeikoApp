import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhphangiadinhnhanvienComponent } from './thanhphangiadinhnhanvien.component';

describe('ThanhphangiadinhnhanvienComponent', () => {
  let component: ThanhphangiadinhnhanvienComponent;
  let fixture: ComponentFixture<ThanhphangiadinhnhanvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhphangiadinhnhanvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhphangiadinhnhanvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
