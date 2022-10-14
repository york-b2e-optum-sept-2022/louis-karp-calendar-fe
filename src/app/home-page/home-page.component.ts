import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {IUsers} from "../../../Interfaces/IUsers";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

   profile: IUsers = {
    id: '',
    username: "",
    password: "",
     eventInvites: []
  }


  constructor(private dataService: DataService) {
    this.profile = this.dataService.getUser();

  }

  createEvent() {
     this.dataService.createEvent();
  }

  viewEvents() {
     this.dataService.viewEvents();
  }

  viewInvites() {
     this.dataService.viewInvites();
  }

  logout() {
     this.dataService.logout();
  }

  ngOnInit(): void {
  }

}
