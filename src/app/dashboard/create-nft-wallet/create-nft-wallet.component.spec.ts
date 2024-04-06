import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNftWalletComponent } from './create-nft-wallet.component';

describe('CreateNftWalletComponent', () => {
  let component: CreateNftWalletComponent;
  let fixture: ComponentFixture<CreateNftWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNftWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNftWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
