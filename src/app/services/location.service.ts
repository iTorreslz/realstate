import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public currentLocation?: [number, number];

  constructor() {
    if (navigator.geolocation) {
      this.getLocation();
    } else {
      alert("Geolocation is not supported by thisun browser.")
    }
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLocation = [position.coords.latitude, position.coords.longitude];
    })
    return this.currentLocation;
  }
}
