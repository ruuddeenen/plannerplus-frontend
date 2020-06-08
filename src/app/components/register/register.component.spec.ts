import {RegisterComponent} from './register.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthService} from '../../shared/services/auth/auth.service';
import {MockAuthService} from '../../shared/services/auth/mock/MockAuthService';
import {FormGroup} from '@angular/forms';

describe('ComponentTests', () => {
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
      it('standard values for testing should validate', () => {
        component = standardValues(component);
        expect(component.validate(component.form)).toBeTrue();
      });

      it('different passwords should fail validating', () => {
        component = standardValues(component);
        component.form.controls.conf_password.setValue('not a password')

        expect(component.validate(component.form)).toBeFalse();
      });

      it('empty required fields should fail validating', () => {
        component = standardValues(component);
        component.form.controls.email.setValue('')

        expect(component.validate(component.form)).toBeFalse();
      });


      it('email must contain @', () => {
        component = standardValues(component);

        component.form.controls.email.setValue('')
        expect(component.validate(component.form)).toBeFalse();


        component.form.controls.email.setValue('test@test.com')
        expect(component.validate(component.form)).toBeTrue();


        component.form.controls.email.setValue('testAttest.com')
        expect(component.validate(component.form)).toBeFalse();
      });
    });

    function standardValues(component: RegisterComponent): RegisterComponent  {
      component.form.controls.name.setValue('John');
      component.form.controls.surname.setValue('Doe');
      component.form.controls.gender.setValue(0);
      component.form.controls.email.setValue('johndoe@test.com');
      component.form.controls.phone.setValue('0612345678');
      component.form.controls.place.setValue('Town');
      component.form.controls.password.setValue('password');
      component.form.controls.conf_password.setValue('password');
      return component;
    }
  });
})
