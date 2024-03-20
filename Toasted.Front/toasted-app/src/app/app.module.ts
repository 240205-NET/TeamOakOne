import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { FiveDayWeatherComponent } from './five-day-weather/five-day-weather.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { AirPollutionComponent } from './air-pollution/air-pollution.component';
import { GeocodingComponent } from './geocoding/geocoding.component';
import { MapComponent } from './map/map.component';
import { WeatherWidgetsComponent } from './weather-widgets/weather-widgets.component';
import { WidgetOneComponent } from './widget-one/widget-one.component';
import { WidgetTwoComponent } from './widget-two/widget-two.component';
import { WidgetThreeComponent } from './widget-three/widget-three.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    CurrentWeatherComponent,
    FiveDayWeatherComponent,
    HomeComponent,
    PageNotFoundComponent,
    WeatherDetailsComponent,
    AirPollutionComponent,
    GeocodingComponent,
    MapComponent,
    FooterComponent,
    WeatherWidgetsComponent,
    WidgetOneComponent,
    WidgetTwoComponent,
    WidgetThreeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    GoogleMapsModule,
    FormsModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
