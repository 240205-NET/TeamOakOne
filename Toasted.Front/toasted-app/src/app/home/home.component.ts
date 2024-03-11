import { Component } from '@angular/core';
import { WeatherAPIService } from '../services/weather-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private weatherAPIService: WeatherAPIService) { }

  title = 'Home';
  description = 'Welcome to the home page!';

  ngOnInit() {
  }
}
