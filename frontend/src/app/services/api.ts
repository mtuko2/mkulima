import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api'; // Dev environment

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather?lat=${lat}&lon=${lon}`);
  }

  getMarketPrice(crop: string, region: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/advisor/market`, { crop, region });
  }

  diagnoseCrop(data: { imageDescription: string, region: string, language?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/advisor/crop-diagnosis`, data);
  }

  getGeneralAdvice(topic: string, location: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/advisor/general`, { topic, location });
  }
}
