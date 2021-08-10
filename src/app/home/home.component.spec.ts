import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CitiesListService } from '../services/cities.list.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let citiesListServiceSPy: jasmine.SpyObj<CitiesListService>;

  beforeEach(async () => {
    const CitiesListServiceSPy = jasmine.createSpyObj("CitiesListService", ["getListOfCities"])
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: CitiesListService, useValue: CitiesListServiceSPy }]
    })
      .compileComponents();
    citiesListServiceSPy = TestBed.get(CitiesListService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOninit() then expect getListOfCities() to be invoked', () => {
    spyOn(component, "getListOfCities");
    component.ngOnInit();
    expect(component.getListOfCities).toHaveBeenCalled();
  });

  it('should test getListOfCities() then expect cities to be defined', () => {
    citiesListServiceSPy.getListOfCities.and.returnValue(of({ list: [{ name: "london" }] }))
    component.getListOfCities();
    expect(citiesListServiceSPy.getListOfCities).toHaveBeenCalled();
    expect(component.cities).toEqual([{ name: "london" }]);
  });
});
