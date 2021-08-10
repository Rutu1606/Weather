import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { LoginComponent } from './login.component';


export class ActivatedRouteMock {
  snapshot = {
    queryParams: {}
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authenticationServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSPy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const RouterSpy = jasmine.createSpyObj("Router", ["navigate"]);
    const AuthenticationServiceSpy = jasmine.createSpyObj("AuthenticationService", ["login"]);
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useValue: RouterSpy },
        { provide: AuthenticationService, useValue: AuthenticationServiceSpy }
      ]
    })
      .compileComponents();
    routerSPy = TestBed.get(Router);
    authenticationServiceSpy = TestBed.get(AuthenticationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit() then expect loginForm & returnUrl to be defined', () => {
    component.ngOnInit();
    expect(component.returnUrl).toBe('/');
    expect(component.loginForm).toBeDefined()
  });

  it('should test onSubmit() when isUserValid is true then expect router.navigate to be invoked ', () => {
    const loginSubject = new BehaviorSubject<boolean>(true);
    component.loginForm = new FormGroup({ "username": new FormControl(), "password": new FormControl() });
    authenticationServiceSpy.login.and.returnValue(loginSubject);
    component.onSubmit();
    expect(routerSPy.navigate).toHaveBeenCalledWith([component.returnUrl]);
    expect(component.loading).toBeFalse();
  });

  it('should test onSubmit() when isUserValid is false then expect invalidCred to be true ', () => {
    const loginSubject = new BehaviorSubject<boolean>(false);
    component.loginForm = new FormGroup({ "username": new FormControl(), "password": new FormControl() });
    authenticationServiceSpy.login.and.returnValue(loginSubject);
    component.onSubmit();
    expect(component.invalidCred).toBeTrue();
  });
});
