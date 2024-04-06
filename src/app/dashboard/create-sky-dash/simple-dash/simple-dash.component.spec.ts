import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDashComponent } from './simple-dash.component';

describe('SimpleDashComponent', () => {
  let component: SimpleDashComponent;
  let fixture: ComponentFixture<SimpleDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
