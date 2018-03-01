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
  loginErrors: string[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLogin(event: Event, form: NgForm): void {
    event.preventDefault();
    this.userService.login(this.user)
      .then(() => this.router.navigate(['/home']))
      .catch(response => console.log('error login', response));
  }

  private handleErrors(errors: string[] | Error): void {
    this.loginErrors = Array.isArray(errors) ? errors: [errors.message];
  }

}
