import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, HttpClientModule, CommonModule]  
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.login({ username: this.username, password: this.password })
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);  // Guarda el token JWT en localStorage
          this.router.navigate(['/inventory']);  // Redirige a la lista de inventario tras iniciar sesión
        },
        error => {
          this.errorMessage = 'Error al iniciar sesión: ' + error.message; // Manejo del error
        }
      );
  }
}