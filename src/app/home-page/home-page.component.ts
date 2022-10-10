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
    password: ""
  }

  isCreating: boolean = false;
   eventView: boolean =  false;
   inviteView: boolean = false;

  constructor(private dataService: DataService) {
    this.profile = this.dataService.getUser();

    this.dataService.$creating.subscribe(data =>
    this.isCreating = true
    )
  }

  createEvent() {
     this.dataService.createEvent();
  }

  ngOnInit(): void {
  }

}
