import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CityDetailsService } from '../services/city.details.service';
import { CityDetailsComponent } from './city-details.component';

const CityName = 'London';
export class ActivatedRouteMock {
  paramMap = of(convertToParamMap({
    name: CityName
  }));
}

describe('CityDetailsComponent', () => {
  let component: CityDetailsComponent;
  let fixture: ComponentFixture<CityDetailsComponent>;
  let cityDetailsServiceSpy: jasmine.SpyObj<CityDetailsService>;

  beforeEach(async () => {
    const CityDetailsServiceSpy = jasmine.createSpyObj("CityDetailsService", ["getCityDetails"]);
    await TestBed.configureTestingModule({
      declarations: [CityDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: CityDetailsService, useValue: CityDetailsServiceSpy }
      ]
    })
      .compileComponents();
    cityDetailsServiceSpy = TestBed.get(CityDetailsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit then expect cityName to be defined and getDetailsOfCityWeather() to be invoked', () => {
    spyOn(component, "getDetailsOfCityWeather");
    component.ngOnInit();
    expect(component.getDetailsOfCityWeather).toHaveBeenCalled();
    expect(component.cityName).toEqual(CityName)
  });

  it('should test getDetailsOfCityWeather then expect cityName to be defined and getDetailsOfCityWeather() to be invoked', () => {
    spyOn(component, "filter9AM");
    cityDetailsServiceSpy.getCityDetails.and.returnValue(of({ city: { name: "london" }, list: [{ id: "11" }] }));
    component.getDetailsOfCityWeather();
    expect(component.filter9AM).toHaveBeenCalled();
    expect(component.details).toEqual([{ id: "11" }]);
    expect(component.city).toEqual({ name: "london" });
  });

  it('should test filter9AM() then expect data that has 9:00 ', () => {
    component.details = [{ dt: 1628586000 }, { dt: 1628566000 }];
    component.city = { name: "london", timezone: 1234 }
    component.filter9AM();
    expect(component.details).toEqual([{ dt: 1628586000 }])
  });

  it('should test formatDate() then expect with timestamp as input then expect date stringto be returned ', () => {
    component.city = { timezone: '' }
    const value = component.formatDate(1628672400);
    expect(value).toEqual('Wed August 11 2021 09:00:00 am');
  });
});
