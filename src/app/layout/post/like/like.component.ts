import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  postid: any;
  likes: number= 1;
  usernames: any;
  like_details: any;
  likesbtn: any;
  userid:any = [];
  userdata:any;
  togglelikes: boolean= false;

  constructor(private _postservice: PostService, private _authService: AuthService) { }

  ngOnInit() {
    this.userid= this._authService.checkUserLoginId();
    this._authService.username$.subscribe((data)=>{    
      this.userdata= data;
    });
  }

  //likes
  like(post){
      this.postid= post._id;
      this.like_details={
      userId: this.userid,
      username: this.userdata,
      postId: post._id,
      like: this.likes
    }
    this._postservice.like(this.like_details).subscribe((data)=>{
      console.log("likes",data);
    });
    this.togglelikes=true;

    this.likesbtn= {
      userId: this.userid,
      postId: this.postid
    }
    this._postservice.getlikes(this.likesbtn).subscribe((data)=>{
      console.log(data);
      this.usernames= data;
      console.log("wresdfcg",this.usernames);
    });
  }

  //unlike the post
  unlike(post){
    this.togglelikes= false;
    this.like_details={
      userId: this.userid,
      postId: post._id
    }
    this._postservice.unlike(this.like_details).subscribe((err)=>{
       console.log(err);
    })

  }
}
