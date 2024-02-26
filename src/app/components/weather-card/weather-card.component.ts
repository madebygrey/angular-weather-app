import { Component, OnDestroy, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, OnDestroy {
  darkMode?: boolean;
  mode$?: Subscription;
  state = 'Clouds';
  condition = 'cloudy'
  currentTemp = 0;
  minTemp = 18;
  maxTemp = 26;

  constructor(public ui: UiService) {}

  ngOnInit(): void {
    this.mode$ = this.ui.darkModeState.subscribe((value) => {
      this.darkMode = value;
    });
  }

  openDetails(): void {
    console.log(123);
  }

  ngOnDestroy(): void {
    this.mode$?.unsubscribe();
  }
}
