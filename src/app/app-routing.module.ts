import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserResolve } from './resolvers';
import { UsersLoginComponent } from './users/users-login/users-login.component';
import { UsersShowComponent } from './users/users-show/users-show.component';
import { UsersComponent } from './users/users.component';
import { BucketListComponent } from './bucket-list/bucket-list.component';

const routes: Routes = [
  {
    path: '',
    component: UsersLoginComponent,
  },
  {
    path: 'userhome',
    component: UsersComponent
  },
  {
    path: 'user/:id',
    component: UsersShowComponent,
    resolve: {
      user: UserResolve
    }
  },
  {
    path: 'home',
    component: BucketListComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
