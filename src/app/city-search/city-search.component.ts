import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherSService } from '../search-city.service';
import { Subscription } from 'rxjs';
import { OpenWeatherMapService } from '../open-weather-map.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit, OnDestroy {
  resSetFromServis: Set<{}>;
  ollCountries: Array<string>;
  chooseCountryName = 'Ukraine';
  unsubscribe: Subscription;
  toggleDD = false;
  choousenCity = '';
  choosenCityNameP;


  constructor(private weatherSService: WeatherSService, private openWeatherMapService: OpenWeatherMapService) { }

  ngOnInit() {
    this.geoFindMe();
    this.weatherSService.allCountry();
    this.unsubscribe =  this.weatherSService.dataCountry.subscribe((res: Array<string>) => {
      this.ollCountries = [...res];
    });
  }

  toggleDropDown(city: string) {
    this.toggleDD = !this.toggleDD;
    this.choousenCity = `${city.split(',')[0]}`;
    this.openWeatherMapService.getWeatherFor5D(city.split(',')[2], city.split(',')[3] ).subscribe(res=>{
      console.log(res);
      this.choosenCityNameP = res;
    });
  }

  searchCity(cityName: string): void {
    if (cityName.length >= 1) {
      this.toggleDD = true;
      this.weatherSService.findCity(cityName, this.chooseCountryName);
      this.resSetFromServis = this.weatherSService.objSetOfCityAndRegion;
    } else { this.toggleDD = false; }
  }



  geoFindMe() {
    if (!navigator.geolocation) {
      console.log('Геолокація не підтримується браузером');
    } else {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.openWeatherMapService.getWeatherFor5D(position.coords.latitude, position.coords.longitude).subscribe(res=>{
          console.log(res);
          this.choosenCityNameP = res;
        })}, error => console.log('Не визначено місцезнаходження'));
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
