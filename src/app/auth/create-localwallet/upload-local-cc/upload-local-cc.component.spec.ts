import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLocalCcComponent } from './upload-local-cc.component';

describe('UploadLocalCcComponent', () => {
  let component: UploadLocalCcComponent;
  let fixture: ComponentFixture<UploadLocalCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadLocalCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLocalCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
