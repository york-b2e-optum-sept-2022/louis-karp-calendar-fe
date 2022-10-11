import { Injectable } from '@angular/core';
import {IUsers} from "../../Interfaces/IUsers";
import {HttpClient} from "@angular/common/http";

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
}
