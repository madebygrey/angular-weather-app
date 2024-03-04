import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  darkMode?: boolean;
  mode$?: Subscription;
  weather$?: Subscription;

  @Input()
  city: string = '';
  cityName: string = '';
  countryName: string = '';
  conditionIcon: string = '';
  condition: string = '';
  currentTemp: number = 0;
  windDir: string = '';
  windSpeed: number = 0;
  errorMessage?: string;
  cityAdded? = false;

  @Output() cityStored = new EventEmitter();

  constructor(public uiService: UiService, private weatherService: WeatherService, public router: Router) {}

  ngOnInit(): void {
    this.mode$ = this.uiService.darkModeState.subscribe((value) => {
      this.darkMode = value;
    });
    this.weather$ = this.weatherService.getCityWeather(this.city).subscribe(data => {
      this.cityName = data.location.name;
      this.countryName = data.location.country;
      this.conditionIcon = data.current.condition.icon;
      this.condition = data.current.condition.text;
      this.currentTemp = data.current.temp_c;
      this.windDir = data.current.wind_dir;
      this.windSpeed = data.current.wind_kph;
    });
  }

  openDetails(): void {
    this.router.navigateByUrl('/details/' + this.cityName);
  }

  ngOnDestroy(): void {
    this.mode$?.unsubscribe();
    this.weather$?.unsubscribe();
  }
}
