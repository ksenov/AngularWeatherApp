import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weatherData?: WeatherData;

  constructor(
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
      this.weatherService.getWeatherData('bern')
        .subscribe({
          next: (response) => {
            this.weatherData = response;
            console.log(response);
          }
        });
  }
}
