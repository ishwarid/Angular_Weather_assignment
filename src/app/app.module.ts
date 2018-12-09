import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { HomeComponent } from './home/home.component';
import { CustomMaterialModule } from "../material.module";
import { HttpClientModule } from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BackendService } from './BackendServices';
@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    BrowserAnimationsModule
  ],
  exports: [BrowserAnimationsModule],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
