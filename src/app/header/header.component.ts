import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isResponse$!: BehaviorSubject<boolean>;
  
  constructor(private authService: AuthService) {
    this.isResponse$ = this.authService.isResponse$;
    this.authCheck();
  }

  public logoutChange() {
    this.authService.logout();
  }

  authCheck() {
    const auth = JSON.parse(localStorage.getItem('isAuth')!);
    
    if (auth === true) {
      this.isResponse$.next(true);
    } else {
      this.isResponse$.next(false);
    }
  }

  ngOnInit(): void {
    
  }

}
