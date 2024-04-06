import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAddDashComponent } from './create-add-dash.component';

describe('CreateAddDashComponent', () => {
  let component: CreateAddDashComponent;
  let fixture: ComponentFixture<CreateAddDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAddDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAddDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
