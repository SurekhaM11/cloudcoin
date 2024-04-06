import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDashComponent } from './upload-dash.component';

describe('UploadDashComponent', () => {
  let component: UploadDashComponent;
  let fixture: ComponentFixture<UploadDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
