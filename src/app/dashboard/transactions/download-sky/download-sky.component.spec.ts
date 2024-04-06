import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSkyComponent } from './download-sky.component';

describe('DownloadSkyComponent', () => {
  let component: DownloadSkyComponent;
  let fixture: ComponentFixture<DownloadSkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadSkyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
