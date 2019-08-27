import { Component, OnInit, Input } from '@angular/core';
import { Weather } from 'src/app/models/weather.model';

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.scss']
})
export class ShowWeatherComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('choosenCityName') choosenCityName: Weather;
  set = new Set();

  constructor() { }

  ngOnInit() {

    console.log(this.choosenCityName)
  }

}
