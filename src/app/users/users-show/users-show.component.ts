import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../user';
import { UserService } from '../../user.service';
// import { BucketListService } from '../../bucket_list.service';
// import { Bucket_List } from '../../bucket_list';


@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html',
  styleUrls: ['./users-show.component.css']
})
export class UsersShowComponent implements OnInit {
  user: User;
  // bucket_lists: Bucket_List[];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    // private bucketListService: BucketListService,
  ) { }

  ngOnInit(): void {
    // this.showUser();

    this.user = this.route.snapshot.data.user;
    // this.showUser();
    // this.bucketListService.getLists()
    //   .subscribe(bucket_lists => {
    //     this.bucket_lists = bucket_lists
    //   });
  }


  // showUser() {
  //   console.log('in showUser', this.user);
  //   this.userService.getUser(this.user._id)
  //     .then(user => this.user = user)
  //     .catch(() => {});
  // }

}
