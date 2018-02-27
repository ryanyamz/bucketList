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
  // bucket_lists: Bucket_List[] = [];
  bucket_list = new Bucket_List();
  newbucket_list = new EventEmitter<Bucket_List>();
  users: Array<User> = [];
  user: User;



  constructor(
    private userService: UserService,
    private bucket_listService: BucketListService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.userService.getUsers()
      .then(users => this.users = users)
      .catch(() => {});

    this.user = this.route.snapshot.data.user;

    // this.bucket_listService.getLists()
    //   .subscribe(bucket_lists => {
    //     this.bucket_lists = bucket_lists
    //   });

  }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault();
    console.log('in OnSubmit in bucketList component', form, this.bucket_list);
    this.bucket_listService.createList(this.bucket_list)
      .subscribe(
        bucket_list => {
          this.newbucket_list.emit(bucket_list);
          // this.bucket_lists.push(this.bucket_list);
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
