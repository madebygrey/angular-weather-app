import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  data!: {};
  city!: string;
  state!: number;
  temp!: number;
  hum!: number;
  wind!: number;
  today!: string;
  weather$!: Subscription;


  constructor(private activeRouter: ActivatedRoute, private weather: WeatherService) {}

  ngOnInit(): void {
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    this.activeRouter.paramMap.subscribe((route: any) => {
      this.city = route.params.city;
      this.weather$ = this.weather.getCityWeather(this.city).subscribe((data) => this.data = data);
    });
  }
  ngOnDestroy(): void {
    this.weather$.unsubscribe();
  }
}
