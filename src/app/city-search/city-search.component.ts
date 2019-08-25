import { Component, OnInit } from '@angular/core';
import { WeatherSService } from '../weather-s.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit {
  resSetFromServis: Set<{}>;

  constructor(private weatherSService: WeatherSService) { }

  ngOnInit() {

  }

  searchCity(cityName: string): void {
    this.weatherSService.findCity(cityName);
    this.resSetFromServis = this.weatherSService.resToShow2;
  }

}
