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
  weatherInfo !: any;
  routerInfo !:Array<any>
  display:any;
  center !: google.maps.LatLngLiteral;
  zoom = 12;
    
  
  constructor(private router:Router, private route:ActivatedRoute, private service:WeatherAPIService){}
  ngOnInit(): void {
    this.routerInfo = [this.route.snapshot.paramMap.get('country'),this.route.snapshot.paramMap.get('city')]
    this.details = history.state;
    this.center = {
      lat:this.details.lat,
      lng:this.details.lon
    }
    this.getWeather(this.details.lat, this.details.lon)
    

  }
  getWeather(lat:number, lon:number){
    this.service.getCurrentWeather(lat,lon).subscribe(
      {
        next:(res)=>{
          this.weatherInfo = res
          console.log(res)
          this.changeInfo(res)
        },
        error:(err)=> console.log(err)
      }
    );
  }

  changeInfo(data:any){
    console.log("change Info", data)
    let sunsetTime  = new Date(data.sys.sunset * 1000);
    let sunriseTime = new Date(data.sys.sunrise * 1000);
    this.weatherInfo.sunset_time = sunsetTime.toLocaleTimeString();
    this.weatherInfo.sunrise_time = sunriseTime.toLocaleTimeString("en-US", {timeZone:"America/New_York"});
    let currentDate = new Date()
    let currentTime = new Date(data.timezone)
    this.weatherInfo.currentTime = currentTime.toLocaleTimeString();
    this.weatherInfo.isDay = (currentDate.getTime() < sunsetTime.getTime())

  }

  moveMap(event:google.maps.MapMouseEvent){
    if(event.latLng !=null){
      this.center = (event.latLng.toJSON())
    }
  }

  move(event:google.maps.MapMouseEvent){
    if(event.latLng !=null){
      this.display = event.latLng.toJSON();
    }
  }
  
}