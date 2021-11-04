import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isResponseError$!: BehaviorSubject<boolean>;
  isResponse$!: BehaviorSubject<boolean>;
  getDataSubs$!: Subscription;
  putDataSubs$!: Subscription;

  constructor(private router: Router,
    private authService: AuthService,
    private userData: UserDataService) {
      this.isResponse$ = this.authService.isResponse$;
      this.isResponseError$ = this.authService.isResponseError$;
      this.getDataSubs$ = this.authService.getDataSubs$;
      this.putDataSubs$ = this.authService.putDataSubs$;
    }

  login(loginDataObject: any) {               
    this.getDataSubs$ = this.userData.getData().pipe(
      map(data => {
        if (data === null) {
          this.isResponseError$.next(true);

        } else {
          const users = Array(data)
          const findEmail = users[0].find((user: any) => {
            return user.email === loginDataObject.email;
          });
          const findPassword = users[0].find((user: any) => {
            return user.password === loginDataObject.password;
          });
              
          if (findEmail && findPassword) {
            this.isResponse$.next(true);  
            localStorage.setItem('isAuth', 'true');
            this.router.navigate(['/home']);

          } else {
            this.isResponseError$.next(true);           
            this.isResponse$.next(false);
          }         
        }    
      })
    ).subscribe(() => {
      this.getDataSubs$.unsubscribe();
    });
  }
}
