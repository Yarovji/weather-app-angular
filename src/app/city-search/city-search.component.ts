import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherSService } from '../search-city.service';
import { Subscription } from 'rxjs';

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


  constructor(private weatherSService: WeatherSService) { }

  ngOnInit() {
    this.weatherSService.allCountry();
    this.unsubscribe =  this.weatherSService.dataCountry.subscribe((res: Array<string>) => {
      this.ollCountries = [...res];
    });
  }
  toggleDropDown(city: string) {
    this.toggleDD = !this.toggleDD;
    this.choousenCity = city;
    console.log(city.split(',')[0])
  }

  searchCity(cityName: string): void {
    if (cityName.length >= 1) {
      this.toggleDD = true;
      this.weatherSService.findCity(cityName, this.chooseCountryName);
      this.resSetFromServis = this.weatherSService.objSetOfCityAndRegion;
    }else this.toggleDD = false;
  }

  geoFindMe() {
    function success(position) {
      console.log(position)
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
      // console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`)

    }
    function error() {
      console.log('Unable to retrieve your location')
    }
    if (!navigator.geolocation) {
      console.log("ne pidtrumyersa brayzerom")
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
