import { Injectable } from '@angular/core';
import { Weatherdata } from '../interfaces/weatherdata';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  async getWeather(city: string): Promise<Weatherdata> {
    const apiUrl = 'http://api.weatherapi.com/v1/current.json?key=a356bdb2ffb74cff97d200645241902&q=' + city + '&aqi=no';
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      if (!data || !data.current) {
        throw new Error('Weather data is invalid');
      }
      const weatherData: Weatherdata = {
        condition: data.current.condition.text,
        image: data.current.condition.icon,
        temperature: data.current.temp_c
      };
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}