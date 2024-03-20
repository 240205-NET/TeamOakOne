import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { FiveDayWeatherComponent } from './five-day-weather/five-day-weather.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetOneComponent } from './widget-one/widget-one.component';
import { WidgetTwoComponent } from './widget-two/widget-two.component';
import { WidgetThreeComponent } from './widget-three/widget-three.component';
import { WeatherWidgetsComponent } from './weather-widgets/weather-widgets.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CurrentWeatherComponent,
    FiveDayWeatherComponent,
    HomeComponent,
    WidgetOneComponent,
    WidgetTwoComponent,
    WidgetThreeComponent,
    WeatherWidgetsComponent,
    WeatherDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
