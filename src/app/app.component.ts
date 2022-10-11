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
  isCreating: boolean = false;
  eventView: boolean =  false;
  inviteView: boolean = false;



  constructor(private dataService: DataService) {

    this.dataService.$register.subscribe( data =>
      this.isRegistering = true
    );

    this.dataService.$login.subscribe( (data) =>
    this.isLoggedIn = true
    );

    this.dataService.$doneRegistering.subscribe(data =>
    this.isRegistering = false
    );

    this.dataService.$creating.subscribe(data => {
      this.isCreating = true;
    this.eventView = false;
     this.inviteView = false;
    }
    )

    this.dataService.$viewEvents.subscribe(data => {
    this.eventView = true
      this.inviteView = false;
    this.isCreating = false;
    }
    )

    this.dataService.$viewInvites.subscribe(data => {
    this.inviteView = true
      this.eventView = false;
    this.isCreating = false;
    }
    )

  }
}
