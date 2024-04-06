import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportNftComponent } from './import-nft.component';

describe('ImportNftComponent', () => {
  let component: ImportNftComponent;
  let fixture: ComponentFixture<ImportNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportNftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
