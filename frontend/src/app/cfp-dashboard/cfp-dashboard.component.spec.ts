import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CfpDashboardComponent } from './cfp-dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { SpeakerDTO } from '@cfp-platform/shared-types';

describe('CfpDashboardComponent', () => {
  let component: CfpDashboardComponent;
  let fixture: ComponentFixture<CfpDashboardComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CfpDashboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CfpDashboardComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create and fetch proposals on init', () => {
    const mockData: SpeakerDTO[] = [
      {
        id: '1',
        name: 'Jane Doe',
        email: 'jane@example.com',
        talkTitle: 'Angular Signals',
        isGDE: true,
      }
    ];

    fixture.detectChanges(); // triggers ngOnInit

    const req = httpMock.expectOne('/api/cfp');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.isLoading()).toBe(false);
    expect(component.submissions()).toEqual(mockData);
  });

  it('should handle empty submissions', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/cfp');
    req.flush([]);

    expect(component.isLoading()).toBe(false);
    expect(component.submissions()).toEqual([]);
  });

  it('should handle HTTP error', () => {
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/cfp');
    req.flush('Error loading', { status: 500, statusText: 'Internal Server Error' });

    expect(component.isLoading()).toBe(false);
    expect(component.error()).toBeTruthy();
  });
});
