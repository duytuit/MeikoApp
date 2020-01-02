import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkexuatnhapkhoktxComponent } from './thongkexuatnhapkhoktx.component';

describe('ThongkexuatnhapkhoktxComponent', () => {
  let component: ThongkexuatnhapkhoktxComponent;
  let fixture: ComponentFixture<ThongkexuatnhapkhoktxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkexuatnhapkhoktxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkexuatnhapkhoktxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
