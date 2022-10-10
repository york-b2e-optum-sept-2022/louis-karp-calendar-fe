import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css']
})
export class EntryPageComponent implements OnInit {

  username: string = "";
  password: string = ""


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.dataService.registerUser();
  }

  loginUser() {
    this.dataService.loginUser();
  }
}
