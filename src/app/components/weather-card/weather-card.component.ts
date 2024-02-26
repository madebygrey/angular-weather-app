import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
  darkMode = false;
  condition = 'clouds';
  currentTemp = 0;
  minTemp = 0;
  maxTemp = 0;

  openDetails(): void {
    console.log(123);
  }
}
