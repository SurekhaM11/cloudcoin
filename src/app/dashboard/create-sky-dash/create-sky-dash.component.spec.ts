import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkyDashComponent } from './create-sky-dash.component';

describe('CreateSkyDashComponent', () => {
  let component: CreateSkyDashComponent;
  let fixture: ComponentFixture<CreateSkyDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSkyDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSkyDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
