import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WeatherAPIService } from '../services/weather-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  title = 'Current Weather Page';
  currentWeatherForm!: FormGroup;
  classError: string = 'errs';
  lat!: number;
  lon!: number;
  weatherData !:Array<any>;
  //injecting title service to set doc/meta tag title for each page in angular
  constructor(
    private route:Router,
    private pageName: Title,
    private weatherService: WeatherAPIService
  ) {}

  ngOnInit(): void {
    this.pageName.setTitle(this.title);
    this.currentWeatherForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('USA', [Validators.required]),
    });
  }

  getCoordinate() {
    console.log(this.currentWeatherForm.value);
    let city = this.currentWeatherForm.value.city;
    let state = this.currentWeatherForm.value.state;
    let country = this.currentWeatherForm.value.country;
    this.weatherService.getCoordinates(city, state, country).subscribe({
      next: (res) => {
        console.log("stage",res)
        this.lat = res[0].lat;
        this.lon = res[0].lon;
        const state:NavigationExtras = {
          state:{
            lat:res[0].lat, 
            lon:res[0].lon
          }
        }
        this.route.navigate([`current/${res[0].country}/${res[0].name}`], state)
        // this.getWeather(this.lat,this.lon)
      },
      error: (err) => console.log(err),
    });
  }
  
  getWeather(lat:number, lon:number){
    this.weatherService.getCurrentWeather(lat,lon).subscribe(
      {
        next:(res)=>{
          this.weatherData = res
          console.log(res)
        },
        error:(err)=> console.log(err)
      }
    );
  }
}
