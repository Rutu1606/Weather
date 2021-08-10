import { Component, OnInit } from '@angular/core';
import { CitiesListService } from '../services/cities.list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cities: any = [];
  country: string = 'England';
  count: number = 5;
  constructor(private citiesListService: CitiesListService) { }

  ngOnInit(): void {
    this.getListOfCities();
  }

  getListOfCities() {
    this.citiesListService.getListOfCities().subscribe((data: any) => {
      this.cities = data.list;
    });
  }
}
