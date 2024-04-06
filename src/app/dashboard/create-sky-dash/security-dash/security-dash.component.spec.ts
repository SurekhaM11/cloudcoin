import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityDashComponent } from './security-dash.component';

describe('SecurityDashComponent', () => {
  let component: SecurityDashComponent;
  let fixture: ComponentFixture<SecurityDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
