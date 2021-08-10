import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CityDetailsService {
    constructor(private httpClient: HttpClient) {

    }

    getCityDetails(cityName: string): Observable<any> {
        const API_key: any = "3d8b309701a13f65b660fa2c64cdc517";
        return this.httpClient.get(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_key}`)
    }
}