import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingNftComponent } from './existing-nft.component';

describe('ExistingNftComponent', () => {
  let component: ExistingNftComponent;
  let fixture: ComponentFixture<ExistingNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingNftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
