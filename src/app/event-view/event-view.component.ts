import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {IUsers} from "../../../Interfaces/IUsers";
import {IEvents} from "../../../Interfaces/IEvents";

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  profile: IUsers = {
    id: "",
  username: '',
  password: "",
  eventInvites: []
}

  events: IEvents[] =[];

  fromTime: string = "";
  toTime: string ='';

  state: string = 'base';

  constructor(private dataService: DataService) {

    this.profile = this.dataService.getUser();
    this.dataService.showMyEvents(this.profile.id);

     this.dataService.$myEvents.subscribe(data => {
      this.events = data;
      // this.convertDate();
    })
  }


  filterEvents() {
    console.log(this.events);
    this.state = 'filtered';
  }

  getDate(time: number) {
      let unix = new Date(time);

      let day = unix.getDay();
      let month = unix.getMonth();
      let year = unix.getFullYear();

      return day + '/' + month + '/' + year;

  }


  ngOnInit(): void {
  }

}
