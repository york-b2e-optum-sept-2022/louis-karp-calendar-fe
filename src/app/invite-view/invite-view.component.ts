import { Component, OnDestroy, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {IEvents} from "../../../Interfaces/IEvents";
import {IUsers} from "../../../Interfaces/IUsers";
import {Subject} from "rxjs";

@Component({
  selector: 'app-invite-view',
  templateUrl: './invite-view.component.html',
  styleUrls: ['./invite-view.component.css']
})
export class InviteViewComponent implements OnInit {

  // onDestroy = new Subject();

  fromTime: string = '';
  toTime: string = '';

  state: string = 'base';

  invites: IEvents[] = []

  invitesCopy: IEvents[] = [];

  singleInvite: IEvents = {
    id: '',
    owner: '',
    eventName: '',
    eventDate: 0,
    eventDescription: '',
    invites: []
  };

  profile: IUsers = {
    id: "",
    username: '',
    password: "",
    eventInvites: []
  }

  constructor(private dataService: DataService) {
    this.profile = this.dataService.getUser();

    this.dataService.showInvites(this.profile.id);

    this.dataService.$myInvite.subscribe(data => {
      this.invites = data;
      this.invites = this.invites.filter(x => x.invites.indexOf(this.profile.id) !== -1)
    })

    this.dataService.$singleInvite.subscribe(data => {
      this.singleInvite = data[0];
    })

  }

  filterInvites() {
    let  fromUnix = Date.parse(this.fromTime) + 61200000;
    let toUnix = Date.parse(this.toTime) + 61200000;
    this.state = 'filtered';
    this.invitesCopy = [];
    this.invites.forEach(val => this.invitesCopy.push(Object.assign({}, val)));
    this.invitesCopy = this.invitesCopy.filter(event => event.eventDate >= fromUnix && event.eventDate <= toUnix);
  }


  showInvite(id: string) {
    this.state = 'viewingInvite';
    this.dataService.pullInvite(id);
  }

  getDate(time: number) {
    let unix = new Date(time);

    let day = unix.getDate();
    let month = unix.getMonth() + 1;
    let year = unix.getFullYear();

    return month + '/' + day + '/' + year;
  }

  setBase() {
    this.state= 'base'
  }


  ngOnInit(): void {
  }
  //
  //   ngOnDestroy (): void {
  //   this.onDestroy.next(null);
  //   this.onDestroy.complete();
  // }


}
