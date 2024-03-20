import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WeatherAPIService } from '../services/weather-api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css']
})
export class GeocodingComponent implements OnInit{
  @Output() mapUpdate = new EventEmitter<{ longitude: string, latitude: string }>();

  title ='Geocoding';
  geocodingForm! : FormGroup;
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
    this.geocodingForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('USA', [Validators.required]),
    });
  }
  getGeocoding(){
    console.log(this.geocodingForm.value);
    let city = this.geocodingForm.value.city;
    let state = this.geocodingForm.value.state;
    let country = this.geocodingForm.value.country;
    this.weatherService.getGeoCoding(city, state, country).subscribe({
      next: (res) =>{
        this.WeatherData = res;
        this.mapUpdate.emit({ longitude: this.WeatherData[0].long, latitude: this.WeatherData[0].lat});
        console.log("After emit");

    },
    error: (err) =>console.log(err),
  });
  }
}
