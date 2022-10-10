import { Component } from '@angular/core';
import {DataService} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'louis.karp.calendar.fe';
  isLoggedIn: boolean = false;
  isRegistering: boolean = false;



  constructor(private dataService: DataService) {

    this.dataService.$register.subscribe( (data) =>
      this.isRegistering = true
    )

    this.dataService.$login.subscribe( (data) =>
    this.isLoggedIn = true
    )
  }
}
