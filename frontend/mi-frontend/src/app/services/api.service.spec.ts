import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve an item by ID', () => {
    const dummyItem = { id: 1, name: 'Lápiz', quantity: 100, price: 0.5 };

    service.getItem(1).subscribe(item => {
      expect(item).toEqual(dummyItem);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/inventory/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyItem);
  });

  it('should handle error on getItem', () => {
    service.getItem(1).subscribe(
      () => fail('should have failed with a 500 status'),
      (error: HttpErrorResponse) => {
        expect(error.message).toContain('Error');
      }
    );

    const req = httpMock.expectOne(`${service['apiUrl']}/inventory/1`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should login successfully', () => {
    const dummyResponse = { token: '12345' };
    const loginData = { username: 'test', password: 'password' };

    service.login(loginData).subscribe(response => {
      expect(response.token).toBe('12345');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should register a new user', () => {
    const registerData = { username: 'newuser', password: 'password' };

    service.register(registerData).subscribe(response => {
      expect(response.message).toBe('Usuario registrado con éxito');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Usuario registrado con éxito' });
  });

  it('should retrieve the inventory', () => {
    const dummyInventory = [
      { id: 1, name: 'Lápiz', quantity: 100, price: 0.5 },
      { id: 2, name: 'Cuaderno', quantity: 50, price: 1.5 }
    ];

    service.getInventory().subscribe(items => {
      expect(items.length).toBe(2);
      expect(items).toEqual(dummyInventory);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/inventory`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInventory);
  });

  it('should add a new item', () => {
    const newItem = { name: 'Borrador', quantity: 50, price: 0.25 };

    service.addItem(newItem).subscribe(item => {
      expect(item.name).toBe('Borrador');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/inventory`);
    expect(req.request.method).toBe('POST');
    req.flush({ id: 3, ...newItem });
  });

  it('should update an item', () => {
    const updatedItem = { name: 'Lápiz', quantity: 150, price: 0.5 };

    service.updateItem(1, updatedItem).subscribe(item => {
      expect(item.quantity).toBe(150);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/inventory/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedItem);
  });

  it('should delete an item', () => {
    service.deleteItem(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/inventory/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});