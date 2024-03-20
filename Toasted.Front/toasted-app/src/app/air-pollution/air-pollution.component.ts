import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherAPIService } from '../services/weather-api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-air-pollution',
  templateUrl: './air-pollution.component.html',
  styleUrls: ['./air-pollution.component.css']
})
export class AirPollutionComponent implements OnInit{
  title ='Air Pollution';
  airPollutionForm! : FormGroup;
  classError!: string;
  lat!: number;
  lon!: number;
  WeatherData !:any;

  constructor(
    private pageName:Title,
    private weatherService:WeatherAPIService
    ){}

  ngOnInit(): void {
    this.pageName.setTitle(this.title);
    this.airPollutionForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('USA', [Validators.required]),
    });
  }

  getCoordinate(){
    console.log(this.airPollutionForm.value);
    let city = this.airPollutionForm.value.city;
    let state = this.airPollutionForm.value.state;
    let country = this.airPollutionForm.value.country;
    this.weatherService.getCoordinates(city, state, country).subscribe({
      next: (res) =>{
      this.getAirPollution(res[0].lat, res[0].lon)
    },
    error: (err) =>console.log(err),
  });
  }

  getAirPollution(lat:number, lon:number){
    this.weatherService.getAirPollution(lat, lon).subscribe(
      {
        next:(res)=>{
          this.WeatherData =res
          console.log("airpollution", res.list[0])
        },
        error:(err) => console.log(err)
      }
    );
  }
  
  airQualities = [
    { value: 1, description: 'Good' },
    { value: 2, description: 'Fair' },
    { value: 3, description: 'Moderate' },
    { value: 4, description: 'Poor' },
    { value: 5, description: 'Very Poor' }
  ];
}

