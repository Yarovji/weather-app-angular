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
  toggleDD = false;
  choousenCity = '';


  constructor(private weatherSService: WeatherSService) { }

  ngOnInit() {
    this.weatherSService.allCountry();
    this.unsubscribe =  this.weatherSService.dataCountry.subscribe((res: Array<string>) => {
      this.ollCountries = [...res];
    });
  }
  toggleDropDown(city) {
    this.toggleDD = !this.toggleDD;
    this.choousenCity = city;
    console.log(city.split(",")[0])
  }

  searchCity(cityName: string): void {
    if (cityName.length >= 1) {
      this.toggleDD = true;
      this.weatherSService.findCity(cityName, this.chooseCountryName);
      this.resSetFromServis = this.weatherSService.objSetOfCityAndRegion;
    }else this.toggleDD = false;
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
