import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  weather: any = null;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.api.getWeather(position.coords.latitude, position.coords.longitude).subscribe(res => {
            this.weather = res;
          });
        },
        (error) => {
          console.warn('Location permission denied or unavailable, using default location.');
          this.getWeatherDefault();
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
      this.getWeatherDefault();
    }
  }

  getWeatherDefault() {
    // Default to Nairobi
    this.api.getWeather(-1.2921, 36.8219).subscribe(res => {
      this.weather = res;
    });
  }
}
