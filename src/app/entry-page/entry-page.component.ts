import { Component, OnInit, OnDestroy } from '@angular/core';
import {DataService} from "../data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css']
})
export class EntryPageComponent implements OnInit {

  username: string = "";
  password: string = "";
  loginError: string = "";


  sub1: Subscription;


  constructor(private dataService: DataService) {
    this.sub1 = this.dataService.$errorLoggingIn.subscribe(data => {
      this.loginError = data;
    });
  }

  ngOnInit(): void {
  }

  registerUser() {
    this.dataService.registerUser();
  }

  loginUser(username: string, password: string) {
    this.dataService.loginUser(username, password);
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe()
  }
}
