import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { NxWelcome } from './nx-welcome';
import { provideRouter } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NxWelcome],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should render main navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('nav.main-nav a');
    expect(links.length).toBe(3);
    expect(links[0].textContent).toContain('Cadastro de Evento');
    expect(links[1].textContent).toContain('Cadastro de Palestra');
    expect(links[2].textContent).toContain('Dashboard');
  });
});
