import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule] // Importa RouterModule para usar <router-outlet> y la navegación
})
export class AppComponent {
  title = 'Inventory Management App';
}