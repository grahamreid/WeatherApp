import { Component, OnInit } from '@angular/core';
import {LocationComponent} from '@app-root/dashboard/location/location.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  _locations = [{'Name': 'Louisville, KY'},
                {'Name': 'Cincinnati, OH'}]

  constructor() { }

  ngOnInit() {
  }

}
