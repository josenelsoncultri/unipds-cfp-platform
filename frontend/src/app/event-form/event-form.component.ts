import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EventDTO } from '@cfp-platform/shared-types';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  eventForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    endereco: ['', Validators.required],
    capacidade: ['', [Validators.required, Validators.min(1)]],
    data: ['', Validators.required]
  });

  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal<string | null>(null);

  isInvalid(controlName: string): boolean {
    const control = this.eventForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.submitSuccess.set(false);

    const payload: EventDTO = this.eventForm.value;

    this.http.post<EventDTO>('/api/event', payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.eventForm.reset();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.submitError.set(err.message || 'An error occurred during submission.');
      }
    });
  }
}
