import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  $register = new Subject<any>();
  $login = new Subject<any>();

  constructor(private httpService: HttpService) { }

  registerUser() {
    this.$register.next("isRegistering");
  }

  loginUser() {
    this.$login.next("loggingIn");
  }
}
