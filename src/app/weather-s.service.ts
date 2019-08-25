import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs';
import { Regions } from './models/regions.model';
import { CountryData } from './models/country_data.model';
import { CityData } from './models/cities.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherSService {
  arrayNamesOfOllCountries = [];
  arrOfOllCountriesName: any;
  arrayOfregion = [];
  objSetOfCityAndRegion = new Set();
  dataCountry = new Subject();

  constructor(private httpService: HttpClient) {}

  allCountry() {
    this.httpService.get('https://raw.githubusercontent.com/solominh/country_state_city_data/master/data/countries.json')
      .pipe(
        map(arrayOfOllCountries => {
          const arr = [];
          // tslint:disable-next-line:forin
          for (const key in arrayOfOllCountries) {
            arr.push(arrayOfOllCountries[key].country);
          }
          return arr;
        })).subscribe(data => {
        this.arrOfOllCountriesName = data;
        this.dataCountry.next(this.arrOfOllCountriesName);
      });
  }

  findCity(cityName: string, countryName: string) {
    this.arrayOfregion.length = 0;
    this.httpService.get(`https://raw.githubusercontent.com/solominh/country_state_city_data/master/data/region/${countryName}.json`)
      .pipe( map((res: {country_data: CountryData, regions: Array<Regions>}) => res.regions)).subscribe(data2 => {
        this.objSetOfCityAndRegion.clear();
        // tslint:disable-next-line:forin
        for (const key in data2) {
          this.arrayOfregion.push(data2[key].toponymName);
        }
        let arrOfRegionNameLocal = []
        // tslint:disable-next-line:prefer-for-of
        for (let citiLop = 0; citiLop < this.arrayOfregion.length; citiLop++) {
          this.httpService.get(
              // tslint:disable-next-line:max-line-length
              `https://raw.githubusercontent.com/solominh/country_state_city_data/master/data/region_city_data/${countryName}/${this.arrayOfregion[citiLop]}.json`
            ).subscribe((res3: {region_data: Regions, country_data: CountryData, cities: Array<CityData>}) => {
                arrOfRegionNameLocal[res3.region_data.adminCode1] = res3.region_data.toponymName;
                let arr3_alt = [];
                let arr3_true = [];
                const arrOfRegion = [];
              // tslint:disable-next-line:forin
                for (const key in res3.cities) {
                arr3_alt.push(res3.cities[key].alternatenames);
                arr3_true.push(res3.cities[key].asciiname);
                arrOfRegion.push(res3.cities[key].admin1_code);
              }
                for (let i = 0; i < arr3_alt.length; i++) {
                // tslint:disable-next-line:prefer-for-of
                for (let alterKilkist = 0; alterKilkist < arr3_alt[i].length; alterKilkist++) {
                  const newarr = arr3_alt[i][alterKilkist].split('');
                  newarr.length = cityName.length;
                  if (newarr.join('').toLowerCase() === cityName.toLowerCase()) {
                    this.objSetOfCityAndRegion.add(`${arr3_true[i]}, ${arrOfRegionNameLocal[arrOfRegion[i]]}`);
                  }
                }
              }
            });
        }
      });
  }
}

