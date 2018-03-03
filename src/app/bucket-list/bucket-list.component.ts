import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { BucketListService } from '../bucket_list.service';
import { User } from '../user';
import { Bucket_List } from '../bucket_list';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-bucket-list',
  templateUrl: './bucket-list.component.html',
  styleUrls: ['./bucket-list.component.css']
})
export class BucketListComponent implements OnInit {
  lists: Array<Bucket_List> = [];
  users: Array<User> = [];
  bucket_list = new Bucket_List();
  user: User;
  // bucket_lists: Bucket_List[];



  constructor(
    private userService: UserService,
    private bucketListService: BucketListService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getUser(this.userService.getUserID())
      .subscribe(user => this.user = user);

    this.userService.getUsers()
      .then(users => {
        this.users = users;
        // this.user = this.users.find(user => user._id === this.userService.getUserID());
      })
      .catch(() => {});

    // this.bucketListService.getUserList(this.userService.getUserID())
    //   .subscribe(lists => this.lists = lists);

    this.bucketListService.getLists()
      .subscribe(lists => this.lists = lists)

  }

  onSubmit(event: Event, form: NgForm): void {
    event.preventDefault();
    console.log('in OnSubmit in bucketList component', form.value, this.bucket_list);
    this.lists.push(this.bucket_list);
    this.bucketListService.createList(this.bucket_list)
    .subscribe(bucket_list => {
      console.log('clearing form')
      this.bucket_list = new Bucket_List();
      form.reset();
      },
      errorResponse => {
        console.log('error onSubmit bucket-list component', errorResponse);
      }
    );

  }

  onLogout(): void {
    this.userService.logout()
      .then(() => {
        console.log('logging out');
        this.router.navigate(['']);
      })
      .catch(error => {
        console.log('errors logging out', error)
      })
  }

}
