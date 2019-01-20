import { Component, OnInit } from '@angular/core';
import { UserService_Rest } from '@app-root/core/http/rest-api.services'
import { HttpClient } from '@angular/common/http';
import { Cache } from '@app-root/core/services/cache.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService_Rest, HttpClient]
})
export class AppComponent {
  
  _username: string

  constructor(private user_service: UserService_Rest, 
              private router: Router,
              private cache: Cache) {}

  ngOnInit() {

    this.cache.emitter.subscribe(username => {
      this._username=username;
      console.log(this._username)
    })

    this.user_service.get()
      .subscribe(data => {}, error => {
        this.router.navigateByUrl('login')
      })
  }

}
