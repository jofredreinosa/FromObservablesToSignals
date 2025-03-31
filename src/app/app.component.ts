import {Component, inject, OnInit, signal} from '@angular/core';
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
  users = signal<User[]>([]);

  ngOnInit(): void {
    void this.loadUsersData();
  }

  private async loadUsersData(): Promise<void> {
    try {
      const users = await this.usersService.getUsers();
      this.users.set(users);
    }
    catch (error) {
      console.error(error);
    }
  }
}
