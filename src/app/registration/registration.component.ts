import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import { v4 as uuidv4 } from 'uuid';
import {IUsers} from "../../../Interfaces/IUsers";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  newUser: IUsers = {
  id: uuidv4(),
  username:  "",
  password: "",
    eventInvites: []
}



  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  createUser(data: IUsers){
    this.dataService.createUser(data);
  }

  returnLogin() {
    this.dataService.returnLogin();
  }
}
