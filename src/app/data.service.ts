import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {first, Subject} from "rxjs";
import {IUsers} from "../../Interfaces/IUsers";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  $register = new Subject<any>();
  $login = new Subject<any>();

  $doneRegistering = new Subject<any>();

  loggedInUser : IUsers = {
    id: "",
    username: "",
    password: ""
  }

  constructor(private httpService: HttpService) { }

  registerUser() {
    this.$register.next("isRegistering");
  }

  loginUser() {
    this.$login.next("loggingIn");
  }

  createUser(newUser: IUsers) {

    this.httpService.addUser(newUser).pipe(first()).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      }
    });

   this.loggedInUser = newUser;
   this.$login.next(newUser);
   this.$doneRegistering.next("finished registering");
  }

  returnLogin() {
    this.$doneRegistering.next("return to login");
  }
}
