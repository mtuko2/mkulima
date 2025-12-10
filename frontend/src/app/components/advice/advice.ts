import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-advice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './advice.html',
  styleUrls: ['./advice.css']
})
export class AdviceComponent {
  topic: string = '';
  location: string = '';
  advice: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private api: ApiService) { }

  getAdvice() {
    if (!this.topic || !this.location) return;

    this.loading = true;
    this.error = '';
    this.advice = '';

    this.api.getGeneralAdvice(this.topic, this.location).subscribe({
      next: (res) => {
        this.advice = res.advice;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to get advice. Please try again.';
        this.loading = false;
      }
    });
  }
}
