import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css']
})
export class EntryPageComponent implements OnInit {

  username: string = "";
  password: string = "";
  loginError: string = "";


  constructor(private dataService: DataService) {
    this.dataService.$errorLoggingIn.subscribe(data =>
      this.loginError = data
    );
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.dataService.registerUser();
  }

  loginUser(username: string, password: string) {
    this.dataService.loginUser(username, password);
  }
}
