import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  public validators = [Validators.required];

  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initLoginForm();
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
