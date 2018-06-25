import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
//event emitter

@Injectable()
export class PostService {

  postObj$ = new Subject<any>();

  constructor(private _http: HttpClient) { }

  getPosts(userid){
  	return this._http.get('http://localhost:3000/posts/'+userid);
  }

  getposts(postid){
    return this._http.get('http://localhost:3000/getposts/'+postid);
  }

  post(pdetails){
  	return this._http.post('http://localhost:3000/createpost', pdetails)
  }

  editpost(id, post_details){
    return this._http.put('http://localhost:3000/editpost/'+id, post_details);
  }

  deletepost(postid){
    return this._http.delete('http://localhost:3000/delete/'+postid);
  }

  comments(comment_details){  	
   return this._http.post("http://localhost:3000/comments", comment_details);
  }

  viewcomments(view_cmnt_details){
    console.log(view_cmnt_details);
  	return this._http.get("http://localhost:3000/viewcomments/"+view_cmnt_details.userId+"/"+view_cmnt_details.postId);
  }

  deletecmnt(cmntid){
    return this._http.delete('http://localhost:3000/deletecmnts/'+cmntid);
  }

  like(like_details){
    return this._http.post("http://localhost:3000/likes", like_details);
  }

  getlikes(likedtls){
    console.log(likedtls);
    return this._http.get('http://localhost:3000/getlikes/'+likedtls.postId);
  }

  unlike(unlike_details){
    console.log(unlike_details);
    return this._http.get("http://localhost:3000/unlikes/"+unlike_details.userId+"/"+unlike_details.postId);
  }
}
