import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterView } from './register.component';

describe('RegisterView', () => {
  let component: RegisterView;
  let fixture: ComponentFixture<RegisterView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
