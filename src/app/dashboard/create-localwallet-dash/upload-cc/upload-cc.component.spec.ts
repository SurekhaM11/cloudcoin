import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCcComponent } from './upload-cc.component';

describe('UploadCcComponent', () => {
  let component: UploadCcComponent;
  let fixture: ComponentFixture<UploadCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
