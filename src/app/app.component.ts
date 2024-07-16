import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { CurrentWeatherInterface } from './models/weather.model';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { GeocodingService } from './services/geocoding.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  errorMessage: string = '';
  cityName: string = 'sssss';
  weatherData?: CurrentWeatherInterface;
  isLoading: boolean = false;

  testWeather: CurrentWeatherInterface = {
    "coord": {
      "lon": 10.99,
      "lat": 44.34
    },
    "weather": [
      {
        "id": 501,
        "main": "Rain",
        "description": "moderate rain",
        "icon": "10d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 298.48,
      "feels_like": 298.74,
      "temp_min": 297.56,
      "temp_max": 300.05,
      "pressure": 1015,
      "humidity": 64,
      "sea_level": 1015,
      "grnd_level": 933
    },
    "visibility": 10000,
    "wind": {
      "speed": 0.62,
      "deg": 349,
      "gust": 1.18
    },
    "rain": {
      "1h": 3.16
    },
    "clouds": {
      "all": 100
    },
    "dt": 1661870592,
    "sys": {
      "type": 2,
      "id": 2075663,
      "country": "IT",
      "sunrise": 1661834187,
      "sunset": 1661882248
    },
    "timezone": 7200,
    "id": 3163858,
    "name": "Zocca",
    "cod": 200
  }     

  constructor(
    private weatherService: WeatherService,
    private geocodingService: GeocodingService
  ) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityName)
    console.log(JSON.stringify(this.weatherData))
  }

  onSubmit() {
    this.isLoading = true;
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string) {
    this.geocodingService.getGeoByCity(cityName).pipe(
      switchMap(geoData => this.weatherService.getCurrentWeather(geoData[0].lat, geoData[0].lon))
    ).subscribe({
      next: data => {
        this.weatherData = data;
        console.log(data)
      },
      error: err => {
        this.errorMessage = `Failed to get weather data: ${err.message}`;
      }
    })
  }

  // addLangIfIsCyrillic(text: string): string {
  //   let isCyrillic = /[а-я]/i.test(text);
  //   let newText: string;
  //   if (isCyrillic) newText = text + '/RU';
  //   else newText = text + '/EN';

  //   return newText;
  // }
}
