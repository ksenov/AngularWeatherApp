import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { GeocodingData } from '../models/geocodingData.model';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private apiKey = environment.apiKey;
  private geocodingUrl = environment.baseApiUrl + '/geo/1.0/direct';


  constructor(private http: HttpClient) { }

  getGeoByCity(city: string): Observable<GeocodingData[]> {
    let params = new HttpParams()
      .set('q', city.toString())
      .set('limit', 2)
      .set('appid', this.apiKey);

    const data = this.http.get<GeocodingData[]>(this.geocodingUrl, {params});
    return data;
  }
}
