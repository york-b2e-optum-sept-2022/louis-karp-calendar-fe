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
          this.checkProfile = this.user[0];
          this.$login.next(this.checkProfile);
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
}
