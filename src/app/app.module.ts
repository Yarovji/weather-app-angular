import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CitySearchComponent } from './city-search/city-search.component';
import { FormsModule } from '@angular/forms';
import { ShowWeatherComponent } from './city-search/show-weather/show-weather.component';
import { TransformStringPipe } from './city-search/transform-string.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CitySearchComponent,
    ShowWeatherComponent,
    TransformStringPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
