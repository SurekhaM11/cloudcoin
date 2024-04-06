import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSkyComponent } from './transfer-sky.component';

describe('TransferSkyComponent', () => {
  let component: TransferSkyComponent;
  let fixture: ComponentFixture<TransferSkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferSkyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferSkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
