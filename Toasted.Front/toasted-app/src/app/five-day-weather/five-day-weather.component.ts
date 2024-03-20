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
        if (data && data.length > 0) {
          latitude = data[0].lat;
          longitude = data[0].lon;

          // Once coordinates are obtained, fetch the five-day weather forecast
          this.fetchFiveDayWeather(latitude, longitude);
        } else {
          console.error('No coordinates found for city:', cityName);
        }
      },
      error: (error: any) => {
        console.error('Failed to fetch coordinates for city:', error);
      },
    });
  }

  fetchFiveDayWeather(latitude: number, longitude: number): void {
    this.weatherService.getFiveDayWeather(latitude, longitude).subscribe({
      next: (data: any) => {
        if (data && data.list) {
          // Group forecast data by date
          const groupedData = this.groupDataByDate(data.list);

          // Select only two entries for each date
          this.forecastData = this.selectTwoEntriesFromEachGroup(groupedData);
        } else {
          console.error(
            'Failed to fetch five-day weather forecast: Data or list is undefined.'
          );
        }
      },
      error: (error) => {
        console.error('Failed to fetch five-day weather forecast:', error);
      },
    });
  }

  groupDataByDate(forecastData: any[]): Map<string, any[]> {
    const groupedData = new Map<string, any[]>();
    forecastData.forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0];
      if (groupedData.has(date)) {
        const existingEntries = groupedData.get(date);
        if (existingEntries) {
          existingEntries.push(entry);
        } else {
          console.error('Existing entries for date are undefined:', date);
        }
      } else {
        groupedData.set(date, [entry]);
      }
    });
    return groupedData;
  }

  selectTwoEntriesFromEachGroup(groupedData: Map<string, any[]>): any[] {
    const selectedData: any[] = [];
    groupedData.forEach((entries, date) => {
      // Sort entries by time
      entries.sort(
        (a, b) => new Date(a.dt_txt).getTime() - new Date(b.dt_txt).getTime()
      );
      // Select first two entries
      selectedData.push(entries[0], entries[1]);
    });
    return selectedData;
  }

  // Converts temperature from Kelvin to Fahrenheit
  kelvinToFahrenheit(kelvin: number): number {
    // Convert Kelvin to Celsius
    const celsius = kelvin - 273.15;
    // Convert Celsius to Fahrenheit
    return (celsius * 9) / 5 + 32;
  }
}
