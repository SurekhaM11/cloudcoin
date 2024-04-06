import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixNftComponent } from './fix-nft.component';

describe('FixNftComponent', () => {
  let component: FixNftComponent;
  let fixture: ComponentFixture<FixNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixNftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
