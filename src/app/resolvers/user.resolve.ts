import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user';

@Injectable()
export class UserResolve implements Resolve<User> {

  constructor(
    private userService: UserService,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.paramMap.get('id'));
  }


}
