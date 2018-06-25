import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../post.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  title: any='';
  description:any='';
  post_details: any={};
  posts:any ={};
  postid:any;

  constructor(private _http: HttpClient, private _postService: PostService, private _authService: AuthService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getposts(this._route.snapshot.params['id']);
  }

  getposts(id){
    console.log(id);
    this.postid= id;
    console.log("postid", this.postid);
    this._postService.getposts(id).subscribe((data)=>{
      this.posts= data;
      console.log("data: ", data);
      console.log("posts ",this.posts);
    });
  }

  editpost(id){
    this.post_details={
      title: this.posts.title,
      description: this.posts.description,
      userId: this._authService.checkUserLoginId()
    }
    console.log(this.post_details);
    console.log("post id:",id);
    this._postService.editpost(id, this.post_details).subscribe((data)=>{
      console.log(data);
      let id= data;
      this._router.navigate(['/listpost', id]);
    });
  }

}
