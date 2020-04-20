import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KypoUserAndGroupApiComponent } from './kypo-user-and-group-api.component';

describe('KypoUserAndGroupApiComponent', () => {
  let component: KypoUserAndGroupApiComponent;
  let fixture: ComponentFixture<KypoUserAndGroupApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KypoUserAndGroupApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KypoUserAndGroupApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
