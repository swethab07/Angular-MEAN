import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:any;
  constructor(private _authservice: AuthService) { }

  ngOnInit() {
  	this._authservice.username$.subscribe((data)=>{
      this.username=data;
    });
  }

}
