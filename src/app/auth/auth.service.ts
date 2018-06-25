import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import {  Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject  } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthService {

  authCheck$ = new Subject<any>();
  username= new BehaviorSubject<any>(null);
  userdata:any;

  username$ = this.username.asObservable();

  constructor(private _http: HttpClient, private _router: Router, private _cookieService: CookieService) { }

  login(details:any){
  	this._http.post('http://localhost:3000/authenticate', details).subscribe((data: any)=>{
  		console.log("data:= ",data.docs._id);
      this.userdata= data.docs.email;
  		if(data.isLoggedIn){
  			this._cookieService.set('token', data.token);
        this._cookieService.set('docs', data.docs._id);
        this.username.next(this.userdata);
        this.authCheck$.next(data.isLoggedIn);
  			this._router.navigate(['/home']);
  		}
  	});
  };

  logoutUser(){
    console.log("logout");
    return this._cookieService.deleteAll();
  }
  
  checkUserStatus(){
  	 return this._cookieService.get('token');
  }

  checkUserLoginId(){
    return this._cookieService.get('docs');
  }
}
