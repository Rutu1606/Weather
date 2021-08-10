import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CitiesListService } from './cities.list.service';


describe('CitiesListService', () => {
    let service: CitiesListService;
    let httpClientSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(async () => {
        const HttpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
        await TestBed.configureTestingModule({
            providers: [{ provide: HttpClient, useValue: HttpClientSpy }]
        })
            .compileComponents();
        httpClientSpy = TestBed.get(HttpClient);
        service = TestBed.inject(CitiesListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('test getListOfCities() then expect httpClient.get to be invoked', () => {
        const API_key: any = "3d8b309701a13f65b660fa2c64cdc517";
        service.getListOfCities();
        expect(httpClientSpy.get).toHaveBeenCalledWith(`http://api.openweathermap.org/data/2.5/box/city?bbox=-1.7,51.5,-1.2,52.3,10&appid=${API_key}`)
    });
});
