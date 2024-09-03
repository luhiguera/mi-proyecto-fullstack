import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';  // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para manejar errores HTTP
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, ` + `Mensaje: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Método para obtener un ítem específico por ID
  getItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inventory/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para iniciar sesión
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Método para registrar un nuevo usuario
  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener todos los ítems del inventario
  getInventory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventory`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para añadir un nuevo ítem al inventario
  addItem(data: { name: string; quantity: number; price: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inventory`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar un ítem del inventario
  updateItem(id: number, data: { name: string; quantity: number; price: number }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/inventory/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar un ítem del inventario
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inventory/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}