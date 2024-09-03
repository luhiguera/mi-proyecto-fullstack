import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
  imports: [ReactiveFormsModule, CommonModule] 
})
export class EditItemComponent implements OnInit {
  itemForm: FormGroup;
  itemId!: number; // ! para indicar que se inicializará más tarde

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = +params['id']; 
      this.loadItem();
    });
  }

  loadItem(): void {
    this.apiService.getItem(this.itemId).pipe(
      catchError(error => {
        console.error('Error al cargar el ítem', error);
        return of(null); // Retorna null en caso de error
      })
    ).subscribe(item => {
      if (item) {
        this.itemForm.patchValue(item); // Parcha el formulario con los valores del ítem
      }
    });
  }

  saveItem(): void {
    if (this.itemForm.valid) {
      this.apiService.updateItem(this.itemId, this.itemForm.value).pipe(
        catchError(error => {
          console.error('Error al guardar el ítem', error);
          return of(null);
        })
      ).subscribe(() => {
        this.router.navigate(['/inventory']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/inventory']);
  }
}