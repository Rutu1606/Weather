import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })

export class CitiesListService {
    constructor(private httpClient: HttpClient) {

    }

    getListOfCities(): Observable<any> {
        const API_key: any = "3d8b309701a13f65b660fa2c64cdc517";
        return this.httpClient.get(`http://api.openweathermap.org/data/2.5/box/city?bbox=-1.7,51.5,-1.2,52.3,10&appid=${API_key}`)
    }

}