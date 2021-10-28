import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  public validators = [Validators.required];
  public isResponseError$!: BehaviorSubject<boolean>;
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private loginService: LoginService) { 
      this.isResponseError$ = this.authService.isResponseError$; 
    }

  ngOnInit(): void {
    this.initLoginForm();
  }

  get emailLogin() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  confirmLoginData() {
    const loginDataObject: User = { 
      "email": this.emailLogin?.value,
      "password": this.password?.value,
      "firstname": "",
      "lastname": "",
      "phone": "",
      "state": "",
      "zipCode": "",
      "city": "",
      "address": "",
      "isAuth": true
    };
      
    this.loginService.login(loginDataObject);
  }

  changeState(data: any) {
    let userData = data.value;
    if (userData === "" && this.loginForm.untouched) {
      this.isResponseError$.next(false);
    }
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{1,9})+$'),
        Validators.required
      ])], 
      password: ['', ...this.validators]
    });
  }
}
