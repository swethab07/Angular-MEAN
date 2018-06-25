import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-viewposts',
  templateUrl: './viewposts.component.html',
  styleUrls: ['./viewposts.component.css']
})
export class ViewpostsComponent implements OnInit {

  posts :any =[];
  pId: any= "";
  userdata:any;
  togglecmnts:boolean = false;

  constructor(private _activatedroute: ActivatedRoute, private _router: Router, private _postService: PostService, private _authService: AuthService) { }

  ngOnInit() {
  	this._authService.username$.subscribe((data)=>{    
      this.userdata= data;
    });
  	this._activatedroute.params.subscribe((data)=>{
  		this.pId= data.id;
  		console.log(this.pId);
	    this._postService.getposts(this.pId).subscribe((data) => {
	    	console.log("data after return in view",data);
	    	this.posts= [data];
	    console.log(this.posts);
        });
      })
  	}

  gotolistposts(){
  	this._router.navigate(['/listpost']);
  }

  toggle(){
    this.togglecmnts= !this.togglecmnts;
  }


}
