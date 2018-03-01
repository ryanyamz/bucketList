import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { BucketListService } from '../../bucket_list.service';
import { Bucket_List } from '../../bucket_list';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html',
  styleUrls: ['./users-show.component.css']
})
export class UsersShowComponent implements OnInit {
  user: User;
  bucket_lists: Bucket_List[];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private bucketListService: BucketListService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.switchMap(params =>this.userService.getUser(params.get('id')))
      .subscribe(user => this.user = user);

    this.route.paramMap.switchMap(params => this.bucketListService.getUserList(params.get('id')))
      .subscribe(bucket_list => this.bucket_lists = bucket_list)


  }


  // showUser() {
  //   console.log('in showUser', this.user);
  //   this.userService.getUser(this.user._id)
  //     .then(user => this.user = user)
  //     .catch(() => {});
  // }

}
