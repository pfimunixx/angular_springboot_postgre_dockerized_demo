import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPasswordRestoreComponent } from './send-password-restore.component';

describe('SendPasswordResetComponent', () => {
  let component: SendPasswordRestoreComponent;
  let fixture: ComponentFixture<SendPasswordRestoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendPasswordRestoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendPasswordRestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
