import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingWalletLoginComponent } from './existing-wallet-login.component';

describe('ExistingWalletLoginComponent', () => {
  let component: ExistingWalletLoginComponent;
  let fixture: ComponentFixture<ExistingWalletLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingWalletLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingWalletLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
