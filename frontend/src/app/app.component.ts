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
  
  _username: string = ''

  constructor(private _user_service: UserService_Rest, 
              private _router: Router,
              private _cache: Cache) {}

  ngOnInit() {

    this._cache.emitter.subscribe(cache => {
      if (cache.hasOwnProperty('username'))
        this._username=cache.username;
    })

    this._user_service.get()
      .subscribe(data => {
        this._router.navigateByUrl('dashboard')
      }, error => {
        this._router.navigateByUrl('login')
      })
  }

  logout() {
    this._user_service.logout()
      .subscribe(() => {
        this._router.navigateByUrl('login')
      })
  }

}
