import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  auth: any={};
  username:any;

  constructor(private _authservice: AuthService, private _http: HttpClient) { }

  ngOnInit() {
    
  }
  
  login(){
  	// console.log(this.auth);
    this._authservice.login(this.auth);
  }
}
