import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkywalletComponent } from './create-skywallet.component';

describe('CreateSkywalletComponent', () => {
  let component: CreateSkywalletComponent;
  let fixture: ComponentFixture<CreateSkywalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSkywalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSkywalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
