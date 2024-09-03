import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate: CanActivateFn = (): boolean | Observable<boolean> => {
    const token = localStorage.getItem('token');

    if (token) {
      // Lógica adicional para verificar la validez del token
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  };
}