import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-item',
  standalone: true,
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  imports: [ReactiveFormsModule, CommonModule] 
})
export class AddItemComponent {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  addItem(): void {
    if (this.itemForm.valid) {
      this.apiService.addItem(this.itemForm.value).pipe(
        catchError(error => {
          console.error('Error al añadir el ítem', error);
          return of(null); // Manejo básico de errores
        })
      ).subscribe(response => {
        if (response) {
          this.router.navigate(['/inventory']);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/inventory']);
  }
}