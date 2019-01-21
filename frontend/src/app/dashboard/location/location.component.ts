import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  @Input() _data

  constructor() { }

  ngOnInit() {
  }

  //convert temperature to integer
  get temp() {
    return parseInt(this._data.temp)
  }

}
