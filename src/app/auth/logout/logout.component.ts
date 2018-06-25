import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router, private _authservice: AuthService) { }

  ngOnInit() {
  	this._router.navigate(['/login']);
    this._authservice.logoutUser();
  }

}
