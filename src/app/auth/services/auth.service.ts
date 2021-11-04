import { Injectable } from '@angular/core';

import { BehaviorSubject,  combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../interfaces/user'
import { UserDataService } from '../services/user-data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isResponseError$ = new BehaviorSubject(false);
  public isResponse$: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuth());
  public postDataSubs$!: Subscription;
  public getDataSubs$!: Subscription;
  public putDataSubs$!: Subscription;
  
  public isFirstStep$ = new BehaviorSubject(true);
  public isSecondStep$ = new BehaviorSubject(false);
  public isThirdStep$ = new BehaviorSubject(false);

  constructor(private userData: UserDataService) { }
  
  signup(usersDataObject: User) {
    const postUsersData = this.userData.postData(usersDataObject);

    this.getDataSubs$ = this.userData.getData().pipe(
      map(data => {
        if (data === null) {
          this.postDataSubs$ = postUsersData.subscribe(data => console.log(data));

        } else {
          const users = Array(data)
          const findUser = users[0].find((user: any) => {
            return user.email === usersDataObject.email;
          });
              
          if (findUser) {
            this.isResponseError$.next(true);  
            this.isFirstStep$.next(true);
            this.isSecondStep$.next(false);   
    
          } else {
            this.postDataSubs$ = postUsersData.subscribe(data => console.log(data));

            localStorage.setItem('Auth User', JSON.stringify(usersDataObject.email));    
          }         
        }    
      })
    ).subscribe(() => {
      this.getDataSubs$.unsubscribe();
      this.postDataSubs$.unsubscribe();
    });
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
    const authEmail = JSON.parse(localStorage.getItem('Auth User')!);

    this.getDataSubs$ = this.userData.getData().pipe(
      map(data => {
        let userID: any;
        Array(data)[0].map((user: any) => {
          if (user.email.toLowerCase() === authEmail.toLowerCase()) {
            userID = user.id;
            const userKeys = Object.keys(user);
            const newDataKey = Object.keys(newData);
          
            const importantKey = userKeys.includes(newDataKey[0], 0);
            
            if (importantKey === true) {
              const result = {
                ...user, 
                ...newData
              }       
              
              this.putDataSubs$ = this.userData.updateData(result, userID)
                .subscribe((data: any) => console.log(userID, data));

              return result;
            }
          } 

          return user;
        });

        console.log(userID);
        
      })
    ).subscribe(() => {
      this.getDataSubs$.unsubscribe();
      this.putDataSubs$.unsubscribe();
    })
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

  getRequests(sub1: any, sub2: any, sub3: any) {
    return combineLatest([this.postDataSubs$, this.getDataSubs$, this.putDataSubs$]).pipe(
      map(([sub1, sub2, sub3]: any) => {
        return {sub1, sub2, sub3};
      })
    )
  }

  isAuth(): boolean {
    return !!localStorage.getItem('isAuth');
  }
}
