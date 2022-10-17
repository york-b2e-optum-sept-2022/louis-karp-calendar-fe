import { Component, OnInit, OnDestroy } from '@angular/core';
import {DataService} from "../data.service";
import {IUsers} from "../../../Interfaces/IUsers";
import {IEvents} from "../../../Interfaces/IEvents";
import {from, Subscription} from "rxjs";

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

  otherUsers: IUsers[] = [];

  valueAsDate: string = '0';

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;


  constructor(private dataService: DataService) {

    this.profile = this.dataService.getUser();
    this.dataService.showMyEvents(this.profile.id);

     this.sub1 = this.dataService.$myEvents.subscribe(data => {
      this.events = data;
    })

    this.sub3 = this.sub2 = this.dataService.$singleEvent.subscribe(data => {
      this.singleEvent = data[0];
    })

    this.dataService.getOtherUsersList();

    this.sub4 = this.dataService.$otherMembers.subscribe(data => {
      this.otherUsers = data;
    });
  }


  filterEvents() {
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

  editEvent(){
    this.state= 'editing';

  }

  findUser(id: string) {
    let foundUser = this.singleEvent.invites.indexOf(id);
    return foundUser;
  }

  editInvite(userId: string) {
    let memberButton = document.getElementById(userId);
    let foundUser = this.singleEvent.invites.indexOf(userId);

    if (foundUser == -1 && memberButton) {
      memberButton.className = 'invited';
      this.singleEvent.invites.push(userId);
    } else if (foundUser !== -1 && memberButton) {
      this.singleEvent.invites.splice(foundUser, 1);
      memberButton.className = 'uninvited';
    }
    console.log(this.singleEvent.invites)
  }

  submitEventEdit() {
    let dateCDTValue = Date.parse(this.valueAsDate) + 61200000;
    this.singleEvent.eventDate = dateCDTValue;
    console.log(this.singleEvent)
    this.dataService.updateInvites(this.singleEvent.invites, this.singleEvent.id);
    this.dataService.updateEvent(this.singleEvent)
    this.dataService.goHomepage();
  }

  confirmDelete() {
    this.state = 'confirmDelete'
  }

  deleteEvent(eventId: string) {
    this.dataService.deleteEvent(eventId);
    this.dataService.goHomepage();
  }
  ngOnInit(): void {
  }

  ngOnDestroy() {
  this.sub1.unsubscribe();
  this.sub2.unsubscribe();
  this.sub3.unsubscribe();
  this.sub4.unsubscribe();
}
}
