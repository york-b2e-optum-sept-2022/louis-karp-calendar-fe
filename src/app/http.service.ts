import { Injectable } from '@angular/core';
import {IUsers} from "../../Interfaces/IUsers";
import {HttpClient} from "@angular/common/http";
import {IEvents} from "../../Interfaces/IEvents";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private HttpClient: HttpClient) { }

  addUser(newUser: IUsers) {
    return this.HttpClient.post('http://localhost:3000/users', newUser);
  }

  checkProfile(username: string, password: string) {
    return this.HttpClient.get('http://localhost:3000/users?username=' + username + '&password=' + password);
  }

  getOtherUsers(id: string) {
    return this.HttpClient.get('http://localhost:3000/users?id_ne=' + id);
  }

  addEvent(event: IEvents) {
    return this.HttpClient.post('http://localhost:3000/events', event)
  }

  getUser(id: string) {
    return this.HttpClient.get('http://localhost:3000/users?id=' + id)
  }
  updateUser(user: IUsers) {
    return this.HttpClient.put( 'http://localhost:3000/users/' + user.id, user)
  }

  showMyEvents(id: string) {
    return this.HttpClient.get('http://localhost:3000/events?owner=' + id)
  }

  pullEvent(id: string) {
    return this.HttpClient.get('http://localhost:3000/events?id=' +id)
  }

  getAllUsers() {
    return this.HttpClient.get('http://localhost:3000/users')
  }

  updateEvent(event: IEvents) {
    return this.HttpClient.put('http://localhost:3000/events/' + event.id, event)
  }

  deleteEvent(eventId: string) {
    return this.HttpClient.delete('http://localhost:3000/events/' +eventId)
  }
}
