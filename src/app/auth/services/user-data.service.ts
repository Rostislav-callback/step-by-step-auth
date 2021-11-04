import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  postData(data: any) {
    return this.http.post('http://localhost:3000/users', data); 
  }

  getData() {
    return this.http.get('http://localhost:3000/users').pipe(
      map((response: any) => {   
        return response;
      })
    );
  }

  updateData(data: any, id: any) {
    console.log('работаем')
    return this.http.put(`http://localhost:3000/users/${id}`, data);
  }
}
