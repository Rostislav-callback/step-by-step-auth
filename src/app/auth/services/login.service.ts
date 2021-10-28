import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isResponseError$!: BehaviorSubject<boolean>;
  isResponse$!: BehaviorSubject<boolean>;

  constructor(private router: Router,
    private authService: AuthService) {
      this.isResponse$ = this.authService.isResponse$;
      this.isResponseError$ = this.authService.isResponseError$;
    }

  login(loginDataObject: any) {
    const loginData = [];                   

    if (localStorage.getItem('Users') == null) {
        this.isResponseError$.next(true);
        
    } else {
        let login = JSON.parse(localStorage.getItem('Users')!);

        loginData.push(loginDataObject);

        const findEmail = login.find((user: any) => user.email === loginDataObject.email);
        const findPassword = login.find((user: any) => user.password === loginDataObject.password);

        if (findEmail && findPassword) {
            const userStatus = login.map((user: any) => {
                user.isAuth = true;
          
                return user;
            });
    
            localStorage.setItem('Users', JSON.stringify(userStatus));

            this.isResponse$.next(true);

            localStorage.setItem('Auth User', JSON.stringify(loginDataObject.email));
            localStorage.setItem('Password', JSON.stringify(loginDataObject.password));

            localStorage.setItem('isAuth', 'true');
            this.router.navigate(['/home']);

        } else {
            this.isResponseError$.next(true);           
            this.isResponse$.next(false);
        }
    }
  }
}
