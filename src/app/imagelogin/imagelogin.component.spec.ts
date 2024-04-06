import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageloginComponent } from './imagelogin.component';

describe('ImageloginComponent', () => {
  let component: ImageloginComponent;
  let fixture: ComponentFixture<ImageloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
