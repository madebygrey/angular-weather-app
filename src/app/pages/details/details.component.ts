import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  darkMode?: boolean;
  mode$?: Subscription;

  city: string = '';
  cityName: string = '';
  countryName: string = '';
  conditionIcon: string = '';
  condition: string = '';
  currentTemp: number = 0;
  windDir: string = '';
  windSpeed: number = 0;
  today!: string;
  weather$!: Subscription;

  cityIllustrationPath: string = '../../assets/cities/default.svg';


  constructor(private activeRouter: ActivatedRoute, private weatherService: WeatherService, public uiService: UiService) {}

  ngOnInit(): void {
    this.mode$ = this.uiService.darkModeState.subscribe((value) => {
      this.darkMode = value;
    });

    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    this.activeRouter.paramMap.subscribe((route: any) => {
      this.city = route.params.city;
      this.weather$ = this.weatherService.getCityWeather(this.city).subscribe(data => {
        console.log(data);
        this.cityName = data.location.name;
        this.countryName = data.location.country;
        this.conditionIcon = data.current.condition.icon;
        this.condition = data.current.condition.text;
        this.currentTemp = data.current.temp_c;
        this.windDir = data.current.wind_dir;
        this.windSpeed = data.current.wind_kph;
      });
    });
  }
  ngOnDestroy(): void {
    this.weather$.unsubscribe();
    this.mode$?.unsubscribe();
  }
}
