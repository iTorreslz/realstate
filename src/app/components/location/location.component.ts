import { Component, OnInit, inject } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { Map, Marker, marker, tileLayer } from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../../interfaces/housinglocation';
import { HousingService } from '../../services/housing.service';
import { WeatherService } from '../../services/weather.service';
import { Weatherdata } from '../../interfaces/weatherdata';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [],
  template: `
  <h1>{{housingLocation?.name}} location</h1>
  <div id="content">
    <div id="mapContent">
      <div id="map"></div>
      <div style="display: flex; flex-direction= row;width: 48%;justify-content: space-between;">
        <button (click)="getCurrentLocation()">Your location</button>
        <button (click)="getHouseLocation()">House location</button>
      </div>
    </div>

    <div id="weather">
      <h1>This is the weather in {{housingLocation?.city}}</h1>
      <p>{{weatherData?.condition}}</p>
      <img src="{{weatherData?.image}}" alt="Weather image">
      <p>Temperature: {{weatherData?.temperature}}°C</p>
    </div>
  </div>
  `,
  styleUrl: './location.component.css'
})
export class LocationComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  weatherService: WeatherService = inject(WeatherService);
  weatherData: Weatherdata | undefined;
  housingLocation: HousingLocation | undefined;

  longitude: number | undefined;
  latitude: number | undefined;

  geo: any;
  map: any;

  constructor(private currentLocation: LocationService) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
      this.weatherService.getWeather(housingLocation!.city).then(weather => {
        this.weatherData = weather;
      });
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.geo = this.currentLocation.getLocation();
    }, 1000);
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.latitude = this.housingLocation!.coordinate.latitude;
      this.longitude = this.housingLocation!.coordinate.longitude;

      this.map = new Map('map').setView([this.latitude, this.longitude], 13);

      marker([this.latitude, this.longitude]).addTo(this.map);

      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }, 1000);

  }

  getCurrentLocation() {
    this.map.remove();
    setTimeout(() => {
      this.map = new Map('map').setView(this.geo, 13);

      marker(this.geo).addTo(this.map);

      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }, 1000);
  }

  getHouseLocation() {
    this.map.remove();
    setTimeout(() => {
      this.latitude = this.housingLocation!.coordinate.latitude;
      this.longitude = this.housingLocation!.coordinate.longitude;

      this.map = new Map('map').setView([this.latitude, this.longitude], 13);

      marker([this.latitude, this.longitude]).addTo(this.map);

      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }, 1000);
  }

}