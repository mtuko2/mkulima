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
    // Determine location or use default (Nairobi)
    this.api.getWeather(-1.2921, 36.8219).subscribe(res => {
      this.weather = res;
    });
  }
}
