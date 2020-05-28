import {RegisterComponent} from './register.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthService} from '../../shared/services/auth/auth.service';
import {MockAuthService} from '../../shared/services/auth/mock/MockAuthService';
import {FormGroup} from '@angular/forms';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        {provide: AuthService, useValue: MockAuthService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
    fixture.destroy();
  });

  describe('#genders', () => {
    it('should define male (0) and female (1)', () => {
      expect(component.genders[0].viewValue).toBe('Male');
      expect(component.genders[1].viewValue).toBe('Female');
      expect(component.genders.length).toBe(2);
    });
  });

  describe('#validateForm', () => {
    it('should return true', () => {
      component.form.controls.name.setValue('John');
      component.form.controls.surname.setValue('Doe');
      component.form.controls.gender.setValue(0);
      component.form.controls.email.setValue('johndoe@test.com');
      component.form.controls.phone.setValue('0612345678');
      component.form.controls.place.setValue('Town');
      component.form.controls.password.setValue('password');
      component.form.controls.conf_password.setValue('password');

      expect(component.validate(component.form)).toBeTrue();
    });
  });
});
