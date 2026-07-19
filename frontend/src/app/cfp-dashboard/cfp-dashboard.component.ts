import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SpeakerDTO } from '@cfp-platform/shared-types';

@Component({
  selector: 'app-cfp-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cfp-dashboard.component.html',
  styleUrls: ['./cfp-dashboard.component.css']
})
export class CfpDashboardComponent implements OnInit {
  private http = inject(HttpClient);

  submissions = signal<SpeakerDTO[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.fetchSubmissions();
  }

  fetchSubmissions() {
    this.isLoading.set(true);
    this.error.set(null);
    this.http.get<SpeakerDTO[]>('/api/cfp').subscribe({
      next: (data) => {
        this.submissions.set(data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load proposals.');
        this.isLoading.set(false);
      }
    });
  }
}
