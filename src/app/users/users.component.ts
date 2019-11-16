import { Component, OnInit } from '@angular/core';
import { UsersDataSource } from './users-data-source';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource: UsersDataSource;
  displayedColumns: string[] = ['name', 'email', 'phone', 'company'];

  constructor(private userService: UserService) {
    this.dataSource = new UsersDataSource(this.userService);
  }

  ngOnInit() {
  }

}
