import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { appRoutes } from './app.routes';
import { authInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes), // Proveedor de rutas
    provideHttpClient(withInterceptors([authInterceptor])), // Proveedor de HttpClient con interceptor JWT
    provideZoneChangeDetection({ eventCoalescing: true }) 
  ]
};