import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class WeatherSService {
  myData: any;
  myData2 = [];
  public resToShow = [];
  public resToShow2 = new Set();

  constructor(private httpService: HttpClient) {}

  findCity(cityName: string) {
    this.httpService.get('https://raw.githubusercontent.com/solominh/country_state_city_data/master/data/countries.json')
      .pipe(map(res => {
          let arr = [];
          // tslint:disable-next-line:forin
          for (const key in res) {
            arr.push(res[key].country);
          }
          console.log(arr);
          return arr;
        })
      )
      .subscribe(data => {
        this.resToShow.length = 0;
        this.resToShow2.clear();
        this.myData = data;
        this.httpService
          .get(
            `https://raw.githubusercontent.com/solominh/country_state_city_data/master/data/region/${this.myData[230]}.json`
          )
          .pipe(
            map(res => {
              return res.regions;
            })
          )
          .subscribe(data2 => {
            // tslint:disable-next-line:forin
            for (const key in data2) {
              this.myData2.push(data2[key].toponymName);
            }
            // tslint:disable-next-line:prefer-for-of
            for (let citiLop = 0; citiLop < this.myData2.length; citiLop++) {
              this.httpService
                .get(
                  // tslint:disable-next-line:max-line-length
                  `https://raw.githubusercontent.com/solominh/country_state_city_data/master/data/region_city_data/${this.myData[230]}/${this.myData2[citiLop]}.json`
                )
                .pipe(
                  map(res => {
                    return res.cities;
                  })
                )
                .subscribe(res3 => {
                  let arr3_alt = [];
                  let arr3_true = [];
                  // tslint:disable-next-line:forin
                  for (const key in res3) {
                    arr3_alt.push(res3[key].alternatenames);
                    arr3_true.push(res3[key].asciiname);
                  }
                  for (let i = 0; i < arr3_alt.length; i++) {
                    // tslint:disable-next-line:prefer-for-of
                    for (
                      let alterKilkist = 0;
                      alterKilkist < arr3_alt[i].length;
                      alterKilkist++
                    ) {
                      let newarr = arr3_alt[i][alterKilkist].split('');
                      newarr.length = cityName.length;
                      // console.log(newarr.join('').toLowerCase());
                      // console.log(cityName.toLowerCase());
                      if (
                        newarr.join('').toLowerCase() == cityName.toLowerCase()
                      ) {

                        this.resToShow.push(arr3_true[i]);
                        this.resToShow2.add(arr3_true[i]);
                        // console.log(arr3_true[i]);
                      }
                    }

                  }
                });
            }
          });
      });
  }
}
