import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.scss']
})
export class ShowWeatherComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('choosenCityName') choosenCityName: any;

  constructor() { }

  ngOnInit() {

  }

}
