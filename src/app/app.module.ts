import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { CookieModule } from 'ngx-cookie';
// import { NotFoundComponent } from './not-found/not-found.component';

import { UserService } from './user.service';
import { BucketListService } from './bucket_list.service';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';
import { UsersLoginComponent } from './users/users-login/users-login.component';
import { UsersShowComponent } from './users/users-show/users-show.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    BucketListComponent,
    UsersLoginComponent,
    UsersShowComponent,
  ],
  imports: [
    CookieModule.forRoot(),
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    BucketListService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
