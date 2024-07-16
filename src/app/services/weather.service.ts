import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { CurrentWeatherInterface } from '../models/weather.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = environment.apiKey;
  private currentWeatherUrl = environment.baseApiUrl + '/data/2.5/weather';
  //https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number): Observable<CurrentWeatherInterface> {
    let params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', this.apiKey)
      .set('units', 'metric')

    return this.http.get<any>(this.currentWeatherUrl, {params});
  }
  
}
