import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(public http: HttpClient) { }

  getCityWeather(city: string): Observable<{}> {
    return this.http.get(
      `https://api.weatherapi.com/v1/current.json?key=2667340343844cdda9083524232112&q=${city}`);
  }
}
