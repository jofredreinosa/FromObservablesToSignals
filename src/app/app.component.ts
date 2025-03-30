import {Component, inject, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {User, UsersService} from "./users.service";

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  templateUrl: './app.component.html',
  imports: [
    DatePipe
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private usersService = inject(UsersService);
  users: User[] = [];

  ngOnInit(): void {
    this.loadUsersData();
  }

  private loadUsersData(): void {
    this.usersService.getUsers().subscribe({
      next: (values) => this.users = values,
      error: (error) => console.error(error)
    });
  }
}
