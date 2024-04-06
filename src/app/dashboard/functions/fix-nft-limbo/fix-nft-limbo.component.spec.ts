import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixNftLimboComponent } from './fix-nft-limbo.component';

describe('FixNftLimboComponent', () => {
  let component: FixNftLimboComponent;
  let fixture: ComponentFixture<FixNftLimboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixNftLimboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixNftLimboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
