import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, map, Observable} from "rxjs";

export interface User {
  dob: string;
  country: string;
  userName: string;
  fullName: string;
  cellPhone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 private http = inject(HttpClient);

 getUsers(): Promise<User[]> {
   const users = this.http.get<User[]>('https://randomuser.me/api/?results=10')
     .pipe( map((data: any) => {
       const response: User[] = data.results.map((user: any) => {
         return {
           fullName: `${user.name.first} ${user.name.last}`,
           dob: user.dob.date,
           country: user.location.country,
           userName: user.login.username,
           cellPhone: user.cell,
           email: user.email,
         }
       });
       return response;
     }));

   return firstValueFrom(users);
 }
}
