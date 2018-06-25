import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  auth: any={};

  constructor(private _router: Router, private _http: HttpClient) { }

  ngOnInit() {
  }

  register(){
  	console.log(this.auth);
    this._http.post("http://localhost:3000/register", this.auth).subscribe((err)=>{
      console.log(err);
    });    
    this._router.navigate(['/login']);
  }

}
