import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkenvvaoraktxComponent } from './thongkenvvaoraktx.component';

describe('ThongkenvvaoraktxComponent', () => {
  let component: ThongkenvvaoraktxComponent;
  let fixture: ComponentFixture<ThongkenvvaoraktxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkenvvaoraktxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkenvvaoraktxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
