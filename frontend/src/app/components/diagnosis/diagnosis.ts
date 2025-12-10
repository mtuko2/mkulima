import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-diagnosis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diagnosis.html',
  styleUrls: ['./diagnosis.css']
})
export class DiagnosisComponent {
  imageDescription: string = '';
  region: string = '';
  diagnosisResult: any = null;
  loading: boolean = false;
  error: string = '';

  constructor(private api: ApiService) { }

  submitDiagnosis() {
    if (!this.imageDescription || !this.region) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.error = '';
    this.diagnosisResult = null;

    this.api.diagnoseCrop({
      imageDescription: this.imageDescription,
      region: this.region
    }).subscribe({
      next: (res) => {
        this.diagnosisResult = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to get diagnosis. Try again.';
        this.loading = false;
      }
    });
  }
}
