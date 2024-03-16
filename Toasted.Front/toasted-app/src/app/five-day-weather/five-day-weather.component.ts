import { Component, OnInit } from '@angular/core';
import { WeatherAPIService } from '../services/weather-api.service';

@Component({
  selector: 'app-five-day-weather',
  templateUrl: './five-day-weather.component.html',
  styleUrls: ['./five-day-weather.component.css'],
})
export class FiveDayWeatherComponent implements OnInit {
  forecastData: any[] = [];
  cityName: string = 'NewYork';

  constructor(private weatherService: WeatherAPIService) {}

  ngOnInit(): void {
    this.getWeatherForCity('New York');
  }

  searchCity(): void {
    if (this.cityName.trim() === '') {
      return;
    }
    this.getWeatherForCity(this.cityName);
  }

  getWeatherForCity(cityName: string): void {
    let latitude: number;
    let longitude: number;

    this.weatherService.getCoordinates(cityName).subscribe({
      next: (data: any) => {
        latitude = data[0].lat;
        longitude = data[0].lon;

        // Once coordinates are obtained, fetch the five-day weather forecast
        this.fetchFiveDayWeather(latitude, longitude);
      },
      error: (error: any) => {
        console.error('Failed to fetch coordinates for city:', error);
      },
    });
  }

  fetchFiveDayWeather(latitude: number, longitude: number): void {
    this.weatherService.getFiveDayWeather(latitude, longitude).subscribe({
      next: (data: any) => {
        this.forecastData = data.list;
      },
      error: (error) => {
        console.error('Failed to fetch five-day weather forecast:', error);
      },
    });
  }

  // Converts temperature from Kelvin to Fahrenheit
  kelvinToFahrenheit(kelvin: number): number {
    // Convert Kelvin to Celsius
    const celsius = kelvin - 273.15;
    // Convert Celsius to Fahrenheit
    return (celsius * 9) / 5 + 32;
  }
}
