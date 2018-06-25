import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../post.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-listpost',
  templateUrl: './listpost.component.html',
  styleUrls: ['./listpost.component.css']
})
export class ListpostComponent implements OnInit {

  posts:any=[];
  data:any=[];
  userid:any = [];
  userdata:any;
  index: any;

  constructor(private _http: HttpClient, private _postservice: PostService, private _authService: AuthService) { }

  //getting posts
  ngOnInit() {
    console.log("List Of Posts!!");
    this.userid= this._authService.checkUserLoginId();
  	this._postservice.getPosts(this.userid).subscribe((data)=>{
      this.posts = data;
      console.log(this.posts);
    });
    this._authService.username$.subscribe((data)=>{    
      this.userdata= data;
    });
    console.log(this.userdata);
  }

  //delete the post
  delete(post){
    console.log(post);
    this._postservice.deletepost(post._id).subscribe((res)=>{
      this.index= this.posts.indexOf(post);
      if(this.index!== -1){
        this.posts.splice(this.index, 1);  
    }
    });
  }

  

}
