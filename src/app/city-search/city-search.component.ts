import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherSService } from '../weather-s.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit, OnDestroy {
  resSetFromServis: Set<{}>;
  ollCountries: Array<string>;
  chooseCountryName = "Ukraine";
  unsubscribe: Subscription;


  constructor(private weatherSService: WeatherSService) { }

  ngOnInit() {
    this.weatherSService.allCountry();
    this.unsubscribe =  this.weatherSService.dataCountry.subscribe((res: Array<string>) => {
      this.ollCountries = [...res];
    });
  }

  searchCity(cityName: string): void {
    if (cityName.length >= 1) {
      this.weatherSService.findCity(cityName, this.chooseCountryName);
      this.resSetFromServis = this.weatherSService.resToShow2;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
