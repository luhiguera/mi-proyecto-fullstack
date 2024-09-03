import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InventoryListComponent } from './inventory-list.component';
import { ApiService } from '../services/api.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;
  let apiService: ApiService;
  let router: Router;

  const mockInventory = [
    { id: 1, name: 'Lápiz', quantity: 100, price: 0.5 },
    { id: 2, name: 'Cuaderno', quantity: 50, price: 2.0 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      declarations: [InventoryListComponent],
      providers: [ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    router = TestBed.inject(Router);

    // Mocking the getInventory method
    spyOn(apiService, 'getInventory').and.returnValue(of(mockInventory));
    spyOn(router, 'navigate');

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load inventory items on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    if (component.inventory$) {
      component.inventory$.subscribe((inventory) => {
        expect(inventory.length).toBe(2);
        expect(inventory).toEqual(mockInventory);
      });
    } else {
      fail('inventory$ is null or undefined');
    }
  });

  it('should navigate to edit item', () => {
    component.editItem(1);
    expect(router.navigate).toHaveBeenCalledWith(['/edit-item', 1]);
  });

  it('should delete an item', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(apiService, 'deleteItem').and.returnValue(of(undefined)); // Cambiado a of(undefined)

    component.deleteItem(1);
    expect(apiService.deleteItem).toHaveBeenCalledWith(1);
    expect(apiService.getInventory).toHaveBeenCalled(); // Verifies that inventory is reloaded
  });

  it('should not delete an item if not confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(apiService, 'deleteItem');

    component.deleteItem(1);
    expect(apiService.deleteItem).not.toHaveBeenCalled();
  });

  it('should navigate to add item', () => {
    component.addItem();
    expect(router.navigate).toHaveBeenCalledWith(['/add-item']);
  });
});