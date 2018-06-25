import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  title: any='';
  description:any='';
  post_details: any={};
  userdata:any;

  constructor(private _http: HttpClient, private _postService: PostService, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {this._authService.username$.subscribe((data)=>{    
      this.userdata= data;
    });
  }

  post(){
    this.post_details={
      username: this.userdata,
      title: this.title,
      description: this.description,
      userId: this._authService.checkUserLoginId()
    }
    console.log(this.post_details);
    this._postService.post(this.post_details).subscribe((err)=>{
      console.log(err);
    });
    this.title= null;
    this.description= null;
    this._router.navigate(['/listpost']);
  }
}
