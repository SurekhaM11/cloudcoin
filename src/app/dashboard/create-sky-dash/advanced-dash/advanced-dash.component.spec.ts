import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedDashComponent } from './advanced-dash.component';

describe('AdvancedDashComponent', () => {
  let component: AdvancedDashComponent;
  let fixture: ComponentFixture<AdvancedDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
