import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

export interface User {
  dob: string;
  country: string;
  postcode: string;
  userName: string;
  fullName: string;
  phone: string;
  cellPhone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 private http = inject(HttpClient);

 getUsers(): Observable<User[]> {
   return this.http.get<User[]>('https://randomuser.me/api/?results=10')
     .pipe( map((data: any) => {
       const response: User[] = data.results.map((user: any) => {
         return {
           fullName: `${user.name.first} ${user.name.last}`,
           dob: user.dob.date,
           country: user.location.country,
           userName: user.login.username,
           phone: user.phone,
           cellPhone: user.cell,
           email: user.email,
         }
       });
       return response;
     }))
 }
}
