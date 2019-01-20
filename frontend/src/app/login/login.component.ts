import { Component, OnInit } from '@angular/core';
import { UserService_Rest } from '@app-root/core/http/rest-api.services'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService_Rest, HttpClient]
})
export class LoginComponent implements OnInit {

  constructor(private user_service: UserService_Rest) {}

  ngOnInit() {}

  handle_login(username: string) {
    this.user_service.login(username)
      .subscribe((data) => {})
  }

}
