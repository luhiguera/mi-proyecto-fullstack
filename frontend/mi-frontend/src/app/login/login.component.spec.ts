import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { ApiService } from '../services/api.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on form submit', () => {
    spyOn(component, 'login').and.callThrough();
    spyOn(apiService, 'login').and.returnValue(of({ token: 'fake-token' }));

    component.username = 'testuser';
    component.password = 'password';
    component.login();

    expect(component.login).toHaveBeenCalled();
    expect(apiService.login).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password',
    });
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('should handle login error', () => {
    spyOn(apiService, 'login').and.returnValue(throwError('error'));
    spyOn(console, 'error');

    component.username = 'testuser';
    component.password = 'password';
    component.login();

    expect(console.error).toHaveBeenCalledWith('Error al iniciar sesión:', 'error');
    expect(localStorage.getItem('token')).toBeNull();
  });
});