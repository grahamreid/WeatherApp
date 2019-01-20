import { Component, OnInit } from '@angular/core';
import { UserService_Rest } from '@app-root/core/http/rest-api.services'
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService_Rest, HttpClient]
})
export class LoginComponent implements OnInit {

  constructor(private user_service: UserService_Rest,
              private _router: Router) {}

  ngOnInit() {}

  handle_login(username: string) {
    this.user_service.login(username)
      .subscribe((data) => {
        this._router.navigateByUrl("dashboard")
      })
  }

}
