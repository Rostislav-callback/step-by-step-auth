import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

//import { User } from '../../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-prsonal-data',
  templateUrl: './prsonal-data.component.html',
  styleUrls: ['./prsonal-data.component.scss']
})
export class PrsonalDataComponent implements OnInit {
  public personalDataForm!: FormGroup;
  public validators = [Validators.required];

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  get firstName() {
    return this.personalDataForm.get('firstName');
  }

  get lastName() {
    return this.personalDataForm.get('lastName');
  }

  get phone() {
    return this.personalDataForm.get('phone');
  }

  setUserData() {
    const userPersonalDataObject = {
      "firstname": this.firstName?.value,
      "lastname": this.lastName?.value,
      "phone": this.phone?.value,  
    }

    this.authService.signupSteps(userPersonalDataObject);
    this.authService.toThirdAuthStep();
  }

  private initForm() {
    this.personalDataForm = this.fb.group({
      firstName: ['', ...this.validators],
      lastName: ['', ...this.validators],
      phone: ['', ...this.validators]
    });
  }

}
