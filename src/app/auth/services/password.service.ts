import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  public noUpperError$ = new BehaviorSubject(false);
  public noLowerError$ = new BehaviorSubject(false);
  public noNumberError$ = new BehaviorSubject(false);

  passwordCheck(letters: any) {
    if (letters !== null) {
      const findUpper = letters.find((elem: any) => elem === elem.toUpperCase());
      const findLower = letters.find((elem: any) => elem === elem.toLowerCase());
      const findNumber = letters.find((elem: any) => elem === String(Number(elem)));
          
      if (!findUpper) {
        this.noUpperError$.next(true);
      } else if (!findLower) {
        this.noLowerError$.next(true);
      } else if (!findNumber) {
        this.noNumberError$.next(true);
      } else {
        this.noUpperError$.next(false);
        this.noLowerError$.next(false);
        this.noNumberError$.next(false);
      }
    } else {
      this.noUpperError$.next(false);
      this.noLowerError$.next(false);
      this.noNumberError$.next(false);
    }
  }

  getErrors() {
    return combineLatest([this.noUpperError$, this.noLowerError$, this.noNumberError$]).pipe(
      map(([error1, error2, error3]: any) => {
        return {error1, error2, error3};
      })
    )
  }

  constructor() { }
}
