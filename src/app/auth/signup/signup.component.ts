import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../interfaces/user';
import { AuthService } from '../services/auth.service';
import { UserDataService } from '../services/user-data.service';
import { PasswordService } from '../services/password.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  hide = true;

  public isResponseError$!: BehaviorSubject<boolean>;
  public subscription: Subscription;
  public passwordValue$!: Observable<any>;
  public validators = [Validators.required];
  public data: any;
  public signupForm!: FormGroup;
  public getUsers$!: Subscription;
  public errorSream$!: Observable<{error1: any, error2: any, error3: any}>;
  public stepSream$!: Observable<{step1: any, step2: any, step3: any}>;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private passwordService: PasswordService,
              private router: Router,
              private userData: UserDataService) {
    this.isResponseError$ = this.authService.isResponseError$;

    this.subscription = this.router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationStart') {
        this.isResponseError$.next(false);
      } 
    });
  }

  ngOnInit(): void {
    this.initForm();
    
    this.errorSream$ = this.passwordService.getErrors();
    this.stepSream$ = this.authService.getSteps();

    this.passwordValue$ = this.signupForm.valueChanges.pipe(
      map((data: any) => {
        let passValue = data.password  
        let letersArray = passValue.match(/\S/g);
        
        if (letersArray !== null) {
          this.passwordService.passwordCheck(letersArray);
        } else {
          this.passwordService.passwordCheck(null);
        }
        
        return data;
      })
    );
  }

  public equalValidator(control: FormGroup): ValidationErrors | null {
    const [, password, confirmPassword] = Object.values(control.value);

    return password === confirmPassword ? null : {
      'Password' : 'Non working'
    }
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  setUserData() {
    const userDataObject: User = {
      "email": this.email?.value,
      "password": this.confirmPassword?.value,
      "firstname": "",
      "lastname": "",
      "phone": "",
      "state": "",
      "zipCode": "",
      "city": "",
      "address": "",
      "isAuth": false
    }

    this.authService.signup(userDataObject);
    this.authService.toSecondAuthStep();
  }

  private initForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{1,9})+$'),
        Validators.required
    ])],
      password: ['', Validators.compose([
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9@$!%*?&]{8,})+$'),
        Validators.required
    ])],
      confirmPassword: ['', ...this.validators]
    }, {
      validators: [this.equalValidator]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
