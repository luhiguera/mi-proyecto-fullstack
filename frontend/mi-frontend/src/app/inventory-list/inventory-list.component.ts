import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; 

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  imports: [CommonModule] 
})
export class InventoryListComponent implements OnInit {
  inventory$: Observable<InventoryItem[]> | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventory$ = this.apiService.getInventory();
  }

  editItem(id: number): void {
    this.router.navigate(['/edit-item', id]);
  }

  deleteItem(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este ítem?')) {
      this.apiService.deleteItem(id).subscribe({
        next: () => {
          this.loadInventory(); // Recarga la lista después de la eliminación
        },
        error: (err) => {
          console.error('Error al eliminar el ítem', err);
        }
      });
    }
  }

  addItem(): void {
    this.router.navigate(['/add-item']);
  }
}