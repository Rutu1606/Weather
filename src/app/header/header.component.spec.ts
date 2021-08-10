import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSPy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const RouterSpy = jasmine.createSpyObj("Router", ["navigate"]);
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: RouterSpy },
      ]
    })
      .compileComponents();
    routerSPy = TestBed.get(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test logout & expect router.navigate to be invoked', () => {
    component.logout();
    expect(routerSPy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
