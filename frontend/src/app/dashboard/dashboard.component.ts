import { Component, OnInit } from '@angular/core';
import {WeatherService_Rest} from '@app-root/core/http/rest-api.services'
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [WeatherService_Rest]
})
export class DashboardComponent implements OnInit {

  _data

  constructor(private _weather_service: WeatherService_Rest) { }

  ngOnInit() {
    this.refresh()
  }

  refresh() {
    this._weather_service.get()
      .subscribe(data => {this._data = data})
  }

}
