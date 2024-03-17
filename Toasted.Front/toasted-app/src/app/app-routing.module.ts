import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { FiveDayWeatherComponent } from './five-day-weather/five-day-weather.component';
import { HomeComponent } from './home/home.component';
import { AirPollutionComponent } from './air-pollution/air-pollution.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'current', component: CurrentWeatherComponent},
  {path: 'five', component: FiveDayWeatherComponent},
  {path: 'air-pollution', component: AirPollutionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
