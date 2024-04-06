import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedSetupComponent } from './advanced-setup.component';

describe('AdvancedSetupComponent', () => {
  let component: AdvancedSetupComponent;
  let fixture: ComponentFixture<AdvancedSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
