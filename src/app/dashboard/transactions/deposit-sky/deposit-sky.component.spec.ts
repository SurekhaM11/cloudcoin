import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositSkyComponent } from './deposit-sky.component';

describe('DepositSkyComponent', () => {
  let component: DepositSkyComponent;
  let fixture: ComponentFixture<DepositSkyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositSkyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositSkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
