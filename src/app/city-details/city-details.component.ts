import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment-timezone';
import { CityDetailsService } from '../services/city.details.service';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit {
  cityName: string = '';
  details: Array<any> = [];
  city: any;

  constructor(private activatedroute: ActivatedRoute,
    private cityDetailsService: CityDetailsService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.cityName = params.get('name') || 'default';
      this.getDetailsOfCityWeather();
    });
  }

  getDetailsOfCityWeather() {
    this.cityDetailsService.getCityDetails(this.cityName).subscribe((data: any) => {
      this.city = data.city;
      this.details = data.list;
      this.filter9AM();
    });
  }

  formatDate(d: number) {
    return (moment.tz(moment.unix(d), this.city.timezone.toString()).format('ddd MMMM D YYYY HH:mm:ss a'));
  }

  filter9AM() {
    const vm = this;
    this.details = this.details.filter(function (obj: any) {
      const dayTime = moment.tz(moment.unix(obj.dt), vm.city.timezone.toString()).format('HH:mm:ss a')
      return dayTime.includes("09:00:00")
    })
  }
}
