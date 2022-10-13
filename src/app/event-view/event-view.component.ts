import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {IUsers} from "../../../Interfaces/IUsers";
import {IEvents} from "../../../Interfaces/IEvents";
import {from} from "rxjs";

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
  eventsCopy: IEvents[] = [];
  singleEvent: IEvents = {
    id: '',
    owner: '',
    eventName: '',
    eventDate: 0,
    eventDescription: '',
    invites: []
  };

  fromTime: string = "0";
  toTime: string ='0';



  state: string = 'base';

  constructor(private dataService: DataService) {

    this.profile = this.dataService.getUser();
    this.dataService.showMyEvents(this.profile.id);

     this.dataService.$myEvents.subscribe(data => {
      this.events = data;
    })

    this.dataService.$singleEvent.subscribe(data => {
      this.singleEvent = data[0];
    })
  }


  filterEvents(fromTime: string, toTime: string) {
   let  fromUnix = Date.parse(this.fromTime) + 61200000;
    let toUnix = Date.parse(this.toTime) + 61200000;
    this.state = 'filtered';
    this.eventsCopy = [];
    this.events.forEach(val => this.eventsCopy.push(Object.assign({}, val)));
    this.eventsCopy = this.eventsCopy.filter(event => event.eventDate >= fromUnix && event.eventDate <= toUnix);
  }

  getDate(time: number) {
      let unix = new Date(time);

      let day = unix.getDate();
      let month = unix.getMonth() + 1;
      let year = unix.getFullYear();

      return month + '/' + day + '/' + year;
  }

  showEvent(id: string) {
    this.state = 'viewingEvent';
    this.dataService.pullEvent(id);
  }

  setBase() {
    this.state= 'base'
  }

  ngOnInit(): void {
  }

}
