import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { HomeComponent } from './layout/home/home.component';
import { CreatepostComponent } from './layout/post/createpost/createpost.component';
import { ListpostComponent } from './layout/post/listpost/listpost.component';
import { ViewpostsComponent } from './layout/post/viewposts/viewposts.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LogoutComponent } from './auth/logout/logout.component';

import { AuthService } from './auth/auth.service';
import { PostService } from './layout/post/post.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';

import { AuthintercepterService } from './auth/authinterceptor.service';
import { CommentsComponent } from './layout/post/comments/comments.component';
import { EditpostComponent } from './layout/post/editpost/editpost.component';
import { LikeComponent } from './layout/post/like/like.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    CreatepostComponent,
    ListpostComponent,
    ViewpostsComponent,
    NavigationComponent,
    LogoutComponent,
    CommentsComponent,
    EditpostComponent,
    LikeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path:"home", component:HomeComponent, canActivate:[AuthGuard]},
        { path:"login", component:LoginComponent},
        { path:"register", component:RegistrationComponent },
        { path:"createpost", component:CreatepostComponent, canActivate:[AuthGuard] },
        { path:"listpost", component: ListpostComponent, canActivate:[AuthGuard]},
        { path:"editpost/:id", component: EditpostComponent, canActivate:[AuthGuard] },
        { path:"viewpost/:id", component: ViewpostsComponent, canActivate:[AuthGuard] },
        { path:"logout", component: LogoutComponent, canActivate:[AuthGuard] },
        { path:"", redirectTo:"home", pathMatch:"full" },
        { path:"**", redirectTo:"home" }
      ])
  ],
  providers: [AuthService, CookieService, AuthGuard, AuthintercepterService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
