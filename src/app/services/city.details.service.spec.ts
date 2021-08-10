import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CityDetailsService } from './city.details.service';


describe('CityDetailsService', () => {
    let service: CityDetailsService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(async () => {
        const HttpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
        await TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: HttpClientSpy }]
        })
            .compileComponents();
        httpClientSpy = TestBed.get(HttpClient);
        service = TestBed.inject(CityDetailsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('test getCityDetails() then expect httpClient.get to be invoked', () => {
        const cityName = "london";
        const API_key: any = "3d8b309701a13f65b660fa2c64cdc517";
        service.getCityDetails(cityName);
        expect(httpClientSpy.get).toHaveBeenCalledWith(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_key}`)
    });
});
