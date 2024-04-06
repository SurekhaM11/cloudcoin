import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMailPswComponent } from './setup-mail-psw.component';

describe('SetupMailPswComponent', () => {
  let component: SetupMailPswComponent;
  let fixture: ComponentFixture<SetupMailPswComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupMailPswComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupMailPswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
