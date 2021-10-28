import { Injectable } from '@angular/core';

import { BehaviorSubject,  combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../interfaces/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isResponseError$ = new BehaviorSubject(false);
  public isResponse$: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth());
  
  public isFirstStep$ = new BehaviorSubject(true);
  public isSecondStep$ = new BehaviorSubject(false);
  public isThirdStep$ = new BehaviorSubject(false);

  constructor() { }

  signup(usersDataObject: User) {
    const userData = [];

    if (localStorage.getItem('Users') == null) {
      userData.push(usersDataObject);

      localStorage.setItem('Users', JSON.stringify(userData));
      localStorage.setItem('Auth User', JSON.stringify(usersDataObject.email));

  } else {
      let data = JSON.parse(localStorage.getItem('Users')!);

      const findUser = data.find((user: any) => user.email === usersDataObject.email);

      if (findUser) {
          this.isResponseError$.next(true);          
      } else {
          data.push(usersDataObject);
      
          localStorage.setItem('Users', JSON.stringify(data));
          localStorage.setItem('Auth User', JSON.stringify(usersDataObject.email));    
      }
    } 
  }

  changeErrorState() {
    this.isResponseError$.next(true);
  }

  toSecondAuthStep() {
    this.isSecondStep$.next(true);
    this.isFirstStep$.next(false);
  }

  toThirdAuthStep() {
    this.isThirdStep$.next(true);
    this.isSecondStep$.next(false);
  }

  signupSteps(usersDataObject: any) {
    this.updateData(usersDataObject);
  }

  private updateData(newData: any): void {
    const users = JSON.parse(localStorage.getItem('Users')!);
    const authEmail = JSON.parse(localStorage.getItem('Auth User')!);

    const newUsers = users.map((user: any) => {
      if (user.email.toLowerCase() === authEmail.toLowerCase()) {
        const userKeys = Object.keys(user);
        const newDataKey = Object.keys(newData);
      
        const importantKey = userKeys.includes(newDataKey[0], 0);
        
        if (importantKey === true) {
          return {
            ...user, 
            ...newData
          }
        }
      } 

      return user;
    });
  
    localStorage.setItem('Users', JSON.stringify(newUsers));
  }

  logout() {
    const users = JSON.parse(localStorage.getItem('Users')!);
    const authedUser = JSON.parse(localStorage.getItem('Auth User')!);

    const logoutUserStatus = users.map((user: any) => {
        if (user.email.toLowerCase() === authedUser.toLowerCase()) {
            user.isAuth = false;
        } 
  
        return user;
    });

    localStorage.setItem('Users', JSON.stringify(logoutUserStatus));


    this.isResponse$.next(false);

    localStorage.setItem('isAuth', 'false');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('Auth User');
    localStorage.removeItem('Password');
  }

  getSteps() {
    return combineLatest([this.isFirstStep$, this.isSecondStep$, this.isThirdStep$]).pipe(
      map(([step1, step2, step3]: any) => {
        return {step1, step2, step3};
      })
    )
  }

  isAuth(): boolean {
    return !!localStorage.getItem('isAuth');
  }
}
