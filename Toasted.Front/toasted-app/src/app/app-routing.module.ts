import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { FiveDayWeatherComponent } from './five-day-weather/five-day-weather.component';
import { HomeComponent } from './home/home.component';
import { WeatherWidgetsComponent } from './weather-widgets/weather-widgets.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'current', component: CurrentWeatherComponent},
  { path: 'current/:country/:city', component: WeatherDetailsComponent },
  {path: 'five', component: FiveDayWeatherComponent},
  { path: 'home', redirectTo:'/', pathMatch:'full' },
  {path: 'weather-widgets', component: WeatherWidgetsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
