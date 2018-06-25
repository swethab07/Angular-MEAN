import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  
  data:any=[];
  comment_details: any={};
  userid:any = [];
  view_cmnt_details:any={};
  view_cmnt: any=[];
  index:any;
  togglecmnts: boolean= false;

  constructor(private _postservice: PostService, private _authService: AuthService) { }

  ngOnInit() {
    this.userid= this._authService.checkUserLoginId();
  }
//toggle comments
  toggle(){
    this.togglecmnts= !this.togglecmnts;
  }

  comments(post){
    this.comment_details={
      userId: this.userid,
      postId: post._id,
      comment: this.data
    }
    console.log(this.comment_details);
    this._postservice.comments(this.comment_details).subscribe((err)=>{
      console.log(err);
    });
    this.data=null;
      
    this.view_cmnt_details= {
      postId: post._id,
      userId: this.userid
    }
    console.log(this.view_cmnt_details);
    this._postservice.viewcomments(this.view_cmnt_details).subscribe((data)=>{
      console.log(data);
      this.view_cmnt= data;
    });
  }

  deletecmnt(cmnt){
    this._postservice.deletecmnt(cmnt._id).subscribe((res)=>{
      this.index= this.view_cmnt.indexOf(cmnt);
      if(this.index!== -1){
        this.view_cmnt.splice(this.index, 1);  
    }
  });
}
}


