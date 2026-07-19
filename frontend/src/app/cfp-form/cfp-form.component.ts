import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpeakerDTO } from '@cfp-platform/shared-types';

@Component({
  selector: 'app-cfp-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cfp-form.component.html',
  styleUrls: ['./cfp-form.component.css']
})
export class CfpFormComponent {
  private http = inject(HttpClient);

  // Form Signals
  name = signal('');
  email = signal('');
  talkTitle = signal('');
  isGDE = signal(false);

  // Touched state for showing validation errors
  nameTouched = signal(false);
  emailTouched = signal(false);
  talkTitleTouched = signal(false);

  // Submission State
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal<string | null>(null);

  // Validation Signals
  nameValid = computed(() => this.name().trim().length > 0);
  emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()));
  talkTitleValid = computed(() => this.talkTitle().trim().length > 0);

  formValid = computed(() => this.nameValid() && this.emailValid() && this.talkTitleValid());

  // Input event handlers for blur (touched state)
  onNameBlur() { this.nameTouched.set(true); }
  onEmailBlur() { this.emailTouched.set(true); }
  onTalkTitleBlur() { this.talkTitleTouched.set(true); }

  onSubmit() {
    if (!this.formValid()) return;

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.submitSuccess.set(false);

    let newId = '';
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      newId = crypto.randomUUID();
    } else {
      newId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    const payload: SpeakerDTO = {
      id: newId,
      name: this.name(),
      email: this.email(),
      talkTitle: this.talkTitle(),
      isGDE: this.isGDE()
    };

    this.http.post<SpeakerDTO>('/api/cfp', payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        this.resetForm();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.submitError.set(err.message || 'An error occurred during submission.');
      }
    });
  }

  resetForm() {
    this.name.set('');
    this.email.set('');
    this.talkTitle.set('');
    this.isGDE.set(false);
    this.nameTouched.set(false);
    this.emailTouched.set(false);
    this.talkTitleTouched.set(false);
  }
}
