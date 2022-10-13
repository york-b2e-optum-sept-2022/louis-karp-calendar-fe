import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {IEvents} from "../../../Interfaces/IEvents";
import {v4 as uuidv4} from 'uuid';
import {IUsers} from "../../../Interfaces/IUsers";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  newEvent: IEvents = {
    id: uuidv4(),
    owner: "",
    eventName: "",
    eventDate: 0,
    eventDescription: "",
    invites: []
}

  otherUsers: IUsers[] = [];

  valueAsDate: string = '0';

  constructor(private dataService: DataService) {
    this.newEvent.owner= this.dataService.getUser().id;
    this.dataService.getOtherUsersList();

    this.dataService.$otherMembers.subscribe(data => {
    this.otherUsers = data;
    });
  }

  inviteUser(userId: string) {
      let memberButton = document.getElementById(userId);
    let foundUser = this.newEvent.invites.indexOf(userId);

    if (foundUser == -1 && memberButton) {
      memberButton.className = 'invited';
      this.newEvent.invites.push(userId);
    } else if (foundUser !== -1 && memberButton) {
      this.newEvent.invites.splice(foundUser, 1);
      memberButton.className = 'uninvited';
    }
  }


    submitEvent() {

    let dateCDTValue = Date.parse(this.valueAsDate) + 61200000;
    this.newEvent.eventDate = dateCDTValue;

    this.dataService.addEventToUsers(this.newEvent.invites, this.newEvent.id);
    this.dataService.addToEventList(this.newEvent);
    this.dataService.goHomepage();
    }

  ngOnInit(): void {

  }

}
