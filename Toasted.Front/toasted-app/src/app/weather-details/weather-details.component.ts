import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherAPIService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {
  details !:any
  weatherInfo !: Array<any>;
  constructor(private router:Router, private route:ActivatedRoute, private service:WeatherAPIService){}
  ngOnInit(): void {
    this.route.params.subscribe(
      para => {
       this.details = para;
      }
    )
    this.getWeather(this.details.lat, this.details.lon)
  }
  getWeather(lat:number, lon:number){
    this.service.getCurrentWeather(lat,lon).subscribe(
      {
        next:(res)=>{
          this.weatherInfo = res
          console.log(res)
        },
        error:(err)=> console.log(err)
      }
    );
  }
  
}
