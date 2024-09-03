import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditItemComponent } from './edit-item.component';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  const mockItem = { id: 1, name: 'Lápiz', quantity: 100, price: 0.5 };

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getItem', 'updateItem']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    activatedRouteStub = {
      params: of({ id: '1' }) // Simulando el parámetro de ruta id
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule],
      declarations: [EditItemComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemComponent);
    component = fixture.componentInstance;

    apiService.getItem.and.returnValue(of(mockItem));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load item on init', () => {
    component.ngOnInit();
    expect(apiService.getItem).toHaveBeenCalledWith(1);
    expect(component.itemForm.value).toEqual({
      name: mockItem.name,
      quantity: mockItem.quantity,
      price: mockItem.price
    });
  });

  it('should handle error when loading item fails', () => {
    apiService.getItem.and.returnValue(throwError('Error'));
    component.loadItem();
    expect(component.itemForm.value).toEqual({
      name: '',
      quantity: '',
      price: ''
    });
  });

  it('should update item when form is valid', () => {
    apiService.updateItem.and.returnValue(of(undefined));
    component.saveItem();
    expect(apiService.updateItem).toHaveBeenCalledWith(1, component.itemForm.value);
    expect(router.navigate).toHaveBeenCalledWith(['/inventory']);
  });

  it('should not update item when form is invalid', () => {
    component.itemForm.patchValue({ name: '', quantity: 0, price: -1 });
    component.saveItem();
    expect(apiService.updateItem).not.toHaveBeenCalled();
  });

  it('should navigate back to inventory on cancel', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/inventory']);
  });
});