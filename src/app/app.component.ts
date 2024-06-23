import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cityName: string = 'moscow';
  weatherData?: WeatherData;

  constructor(
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityName + '/EN')
  }

  onSubmit() {
    this.getWeatherData(this.addLangIfIsCyrillic(this.cityName));
    this.cityName = ''
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName)
        .subscribe({
          next: (response) => {
            this.weatherData = response;
            console.log(response);
          }
    });
  }

  addLangIfIsCyrillic(text: string): string {
    let isCyrillic = /[а-я]/i.test(text);
    let newText: string;
    if (isCyrillic) newText = text + '/RU';
    else newText = text + '/EN';

    return newText;
  }
}
