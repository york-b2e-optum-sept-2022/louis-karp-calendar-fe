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
}
