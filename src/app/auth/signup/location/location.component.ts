import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  public locationDataForm!: FormGroup;
  public isResponse$: BehaviorSubject<boolean>;
  public validators = [Validators.required];

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
                this.isResponse$ = this.authService.isResponse$;
               }

  ngOnInit(): void {
    this.initForm();
  }

  get state() {
    return this.locationDataForm.get('state');
  }

  get city() {
    return this.locationDataForm.get('city');
  }

  get address() {
    return this.locationDataForm.get('address');
  }

  get zipCode() {
    return this.locationDataForm.get('zipCode');
  }

  setLocationUserData() {
    const locationDataObject = {
      "state": this.state?.value,
      "city": this.city?.value,
      "address": this.address?.value,  
      "zipCode": this.zipCode?.value,
      "isAuth": true
    }

    this.authService.signupSteps(locationDataObject);
    this.isResponse$.next(true);
    
    localStorage.setItem('isAuth', 'true'); 
  }

  toPreviousStep() {
    this.authService.toSecondAuthStep();
  }


  private initForm() {
    this.locationDataForm = this.fb.group({
      state: ['', ...this.validators],
      city: ['', ...this.validators],
      address: ['', ...this.validators],
      zipCode: ['', ...this.validators]
    });
  }

}
