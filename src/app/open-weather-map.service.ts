import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {

  constructor(private http: HttpClient) { }

  getWeather(lat: string, lng: string): Observable<any> {
    return this.http.get<any>(`
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=e99c8b647eaa568a33526aa67d544c91`);
  }

  getWeatherFor5D(lat: string, lng: string): Observable<any> {
    return this.http.get<any>(`
    https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&APPID=e99c8b647eaa568a33526aa67d544c91`);
  }

}
