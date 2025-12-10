import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './market.html',
  styleUrls: ['./market.css']
})
export class MarketComponent {
  crop: string = 'Maize';
  region: string = 'Nairobi';
  marketData: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private api: ApiService) { }

  checkPrices() {
    this.loading = true;
    this.error = '';
    this.marketData = null;

    this.api.getMarketPrice(this.crop, this.region).subscribe({
      next: (res) => {
        this.marketData = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to fetch prices. Please try again.';
        this.loading = false;
      }
    });
  }
}
