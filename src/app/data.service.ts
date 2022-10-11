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

  $errorLoggingIn = new Subject<any>();

  loggedInUser : IUsers = {
    id: "",
    username: "",
    password: ""
  };

  checkProfile : IUsers = {
    id: "",
    username: "",
    password: ""
  };

  private user: any = null;

  $creating = new Subject<any>();
  $viewEvents = new Subject<any>();
  $viewInvites = new Subject<any>();


  constructor(private httpService: HttpService) { }

  registerUser() {
    this.$register.next("isRegistering");
  }

  loginUser(username: string, password: string) {

    this.checkProfile = {
      id: "0",
      username: username,
      password: password
    }

    this.httpService.checkProfile(this.checkProfile.username, this.checkProfile.password).pipe(first()).subscribe({
      next: (data) => {

        this.user = data;

        if (this.user.length !== 0 && this.checkProfile) {
          this.loggedInUser = this.user[0];
          this.$login.next(this.loggedInUser);
        } else {
          this.$errorLoggingIn.next("Your username and/or password is incorrect. Please try again.");
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  createUser(newUser: IUsers) {

    this.httpService.addUser(newUser).pipe(first()).subscribe({
      next: (data) => {
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

  getUser() {
      if (this.loggedInUser === null) {
        throw new Error('no profile is set')
      }
      return this.loggedInUser;
    }

    createEvent() {
      this.$creating.next("is Creating");
    }

    viewEvents() {
    this.$viewEvents.next("viewing events");
    }

    viewInvites() {
    this.$viewInvites.next("viewing invites");
    }
}
