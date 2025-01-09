import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherApiUrl = 'http://localhost:8080/api/weather';
  private bikesApiUrl = 'http://localhost:8080/api/bikes';
  private trendsApiUrl = 'http://localhost:8080/api/trends';
  private weatherTrendsApiUrl = 'http://localhost:8080/api/weather-trends';
  private recommendationsApiUrl = 'http://localhost:8080/api/recommendations';
  private weatherToBikeDistancesApiUrl = 'http://localhost:8080/api/weather-to-bike-distances';
  private bikeTypeAvailabilityApiUrl = 'http://localhost:8080/api/bike-types/availability';
  

  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<any> {
    return this.http.get(this.weatherApiUrl);
  }

  getBikesData(): Observable<any> {
    return this.http.get(this.bikesApiUrl);
  }

  getTrendsData(): Observable<any[]> {
    return this.http.get<any[]>(this.trendsApiUrl);
  }

  getWeatherTrendData(): Observable<any> {
    return this.http.get(this.weatherTrendsApiUrl);
  }

  getRecommendationData(userPreferences: any): Observable<any> {
    return this.http.post<any[]>(this.recommendationsApiUrl, userPreferences);
  }

  getWeatherToBikeDistancedData(weatherStationName: string): Observable<any> {
    const url = `${this.weatherToBikeDistancesApiUrl}?weatherStationName=${encodeURIComponent(weatherStationName)}`;
    return this.http.get(url);
  }

  getBikeTypeAvailabilityData(bikeType: string): Observable<any> {
    const url = `${this.bikeTypeAvailabilityApiUrl}?bikeType=${encodeURIComponent(bikeType)}`;
    return this.http.get(url);
  }
}
