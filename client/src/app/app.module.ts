import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/shared/header/header.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { FavMoviesComponent } from './component/fav-movies/fav-movies.component';
import { MoviesComponent } from './component/movies/movies.component';
import { MovieListComponent } from './component/movies/movie-list/movie-list.component';
import { MovieComponent } from './component/movies/movie-list/movie/movie.component';
import { MovieSearchComponent } from './component/movies/movie-search/movie-search.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TmdbApiService } from './services/tmdb-api.service';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { Interceptor } from './http.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
  AppComponent,
  HeaderComponent,
  FooterComponent,
  FavMoviesComponent,
  MoviesComponent,
  MovieListComponent,
  MovieComponent,
  MovieSearchComponent,
  LoginComponent,
  SignupComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgxSpinnerModule,
  BrowserAnimationsModule,
  NgxPaginationModule,
  NgbModule
  ],
  providers: [MessageService,{provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
