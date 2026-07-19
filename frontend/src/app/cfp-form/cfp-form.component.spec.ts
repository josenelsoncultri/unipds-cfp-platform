import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CfpFormComponent } from './cfp-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

describe('CfpFormComponent', () => {
  let component: CfpFormComponent;
  let fixture: ComponentFixture<CfpFormComponent>;

  beforeEach(async () => {
    if (!globalThis.crypto || !globalThis.crypto.randomUUID) {
      Object.defineProperty(globalThis, 'crypto', {
        value: {
          randomUUID: () => '12345678-1234-1234-1234-123456789abc'
        }
      });
    }

    await TestBed.configureTestingModule({
      imports: [CfpFormComponent, FormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CfpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and verify initial state of form Signals', () => {
    expect(component).toBeTruthy();
    expect(component.name()).toBe('');
    expect(component.email()).toBe('');
    expect(component.talkTitle()).toBe('');
    expect(component.isGDE()).toBe(false);
    expect(component.formValid()).toBe(false);
  });

  it('submit button is disabled initially', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('submit button is disabled when fields are invalid', () => {
    component.name.set('Alice');
    component.email.set('invalid-email');
    component.talkTitle.set('My Talk');
    fixture.detectChanges();
    
    expect(component.formValid()).toBe(false);

    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('submit button is enabled when form Signals hold valid values', () => {
    component.name.set('Alice');
    component.email.set('alice@example.com');
    component.talkTitle.set('My Awesome Talk');
    fixture.detectChanges();
    
    expect(component.formValid()).toBe(true);

    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBe(false);
  });
});
