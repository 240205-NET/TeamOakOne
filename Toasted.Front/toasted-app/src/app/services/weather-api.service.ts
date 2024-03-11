import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(private http: HttpClient) { }


  //OpenWeatherMap API Service
  //openweathermap.org/api


  //endpoint: Geocoding API
  //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
  //example response:
  //"state code" and "country code" are optional, state code is actually just state name.
  // [
  //   {
  //     "name": "The Bronx",
  //     "local_names": {
  //         "ru": "Бронкс",
  //         "en": "The Bronx"
  //     },
  //     "lat": 40.8466508,
  //     "lon": -73.8785937,
  //     "country": "US",
  //     "state": "New York"
  //   }
  //]
  getCoordinates(city: string, state?: string, country?: string): Observable<any> {
    let url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city;
    if (state) {
      url += ',' + state;

      if(country) {
        url += ',' + country;
      }
    }

    url += '&limit=5&appid='+ environment.openWeatherKey;

    return this.http.get(url);
  }

  //endpoint: Current Weather Data
  //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  //example response:
//   {
//     "coord": {
//         "lon": -73.8786,
//         "lat": 40.8467
//     },
//     "weather": [      //array of objects
//         {
//             "id": 803,
//             "main": "Clouds",
//             "description": "broken clouds",
//             "icon": "04n"
//         }
//     ],
//     "base": "stations",
//     "main": {
//         "temp": 277.38,
//         "feels_like": 271.51,
//         "temp_min": 275.74,
//         "temp_max": 278.66,
//         "pressure": 997,
//         "humidity": 65
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 10.8,
//         "deg": 260,
//         "gust": 18.01
//     },
//     "clouds": {
//         "all": 75
//     },
//     "dt": 1710117807,
//     "sys": {
//         "type": 2,
//         "id": 57022,
//         "country": "US",
//         "sunrise": 1710069282,
//         "sunset": 1710111409
//     },
//     "timezone": -14400,
//     "id": 5110253,
//     "name": "Bronx County",
//     "cod": 200
// }

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + environment.openWeatherKey;
    return this.http.get(url);
  }

  //endpoint: 5 Day Weather Forecast
  //https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
  //example response:
  // {
  //   "cod": "200",
  //   "message": 0,
  //   "cnt": 40,
  //   "list": [            //cut off for brevity
  //       {
  //           "dt": 1710126000,
  //           "main": {
  //               "temp": 276.35,
  //               "feels_like": 270.99,
  //               "temp_min": 274.94,
  //               "temp_max": 276.35,
  //               "pressure": 998,
  //               "sea_level": 998,
  //               "grnd_level": 997,
  //               "humidity": 63,
  //               "temp_kf": 1.41
  //           },
  //           "weather": [
  //               {
  //                   "id": 600,
  //                   "main": "Snow",
  //                   "description": "light snow",
  //                   "icon": "13n"
  //               }
  //           ],
  //           "clouds": {
  //               "all": 71
  //           },
  //           "wind": {
  //               "speed": 7.97,
  //               "deg": 290,
  //               "gust": 13.98
  //           },
  //           "visibility": 10000,
  //           "pop": 0.2,
  //           "snow": {
  //               "3h": 0.13
  //           },
  //           "sys": {
  //               "pod": "n"
  //           },
  //           "dt_txt": "2024-03-11 03:00:00"
  //       },
  //       {
  //           "dt": 1710136800,
  //           "main": {
  //               "temp": 275.01,
  //               "feels_like": 269.12,
  //               "temp_min": 273.99,
  //               "temp_max": 275.01,
  //               "pressure": 998,
  //               "sea_level": 998,
  //               "grnd_level": 998,
  //               "humidity": 59,
  //               "temp_kf": 1.02
  //           },
  //           "weather": [
  //               {
  //                   "id": 803,
  //                   "main": "Clouds",
  //                   "description": "broken clouds",
  //                   "icon": "04n"
  //               }
  //           ],
  //           "clouds": {
  //               "all": 62
  //           },
  //           "wind": {
  //               "speed": 8.34,
  //               "deg": 290,
  //               "gust": 17.18
  //           },
  //           "visibility": 10000,
  //           "pop": 0,
  //           "sys": {
  //               "pod": "n"
  //           },
  //           "dt_txt": "2024-03-11 06:00:00"
  //       },

  getFiveDayWeather(lat: number, lon: number): Observable<any> {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + environment.openWeatherKey;
    return this.http.get(url);
  }

  //endpoint: Air Pollution API
  //https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}
  //current air pollution data
  //example response:
  //   {
  //     "coord": {
  //         "lon": -73.8786,
  //         "lat": 40.8467
  //     },
  //     "list": [
  //         {
  //             "main": {
  //                 "aqi": 2
  //             },
  //             "components": {
  //                 "co": 263.69,
  //                 "no": 0,
  //                 "no2": 5.23,
  //                 "o3": 65.8,
  //                 "so2": 0.44,
  //                 "pm2_5": 0.5,
  //                 "pm10": 0.9,
  //                 "nh3": 0.43
  //             },
  //             "dt": 1710119995
  //         }
  //     ]
  // }

  getAirPollution(lat: number, lon: number): Observable<any> {
    let url = 'https://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=' + environment.openWeatherKey;
    return this.http.get(url);
  }

  //endpoint: Historical Air Pollution API
  //https://api.openweathermap.org/data/2.5/air_pollution/history?lat={lat}&lon={lon}&start={start}&end={end}&appid={API key}
  //
  //unix time format for start and end
  //
  //example response:
  //same as above, just with more objects in the list array

  getHistoricalAirPollution(lat: number, lon: number, start: number, end: number): Observable<any> {
    let url = 'https://api.openweathermap.org/data/2.5/air_pollution/history?lat=' + lat + '&lon=' + lon + '&start=' + start + '&end=' + end + '&appid=' + environment.openWeatherKey;
    return this.http.get(url);
  }

  //endpoint: Forecast Air Pollution API
  //https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat={lat}&lon={lon}&appid={API key}
  //example response:
  //same as above, just with more objects in the list array

  getForecastAirPollution(lat: number, lon: number): Observable<any> {
    let url = 'https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + environment.openWeatherKey;
    return this.http.get(url);
  }
}
