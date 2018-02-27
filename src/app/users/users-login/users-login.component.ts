import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user';



@Component({
  selector: 'app-users-login',
  templateUrl: './users-login.component.html',
  styleUrls: ['./users-login.component.css']
})
export class UsersLoginComponent implements OnInit {
  user: User = new User();

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogin(event: Event, form: NgForm): void {
    event.preventDefault();
    this.userService.login(this.user)
      .subscribe(
        user => {
          console.log('in LOGIN onSubmit');
          this.router.navigate(['/home']);
        },
        errorResponse => {
          console.log('in LOGIN onLogin errors', errorResponse);
        },
      );
  }

}
