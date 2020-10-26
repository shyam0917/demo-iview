import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from './../config/config.constant';


@Injectable()
export class TmdbApiService {
  data:any={};

  constructor(private http: HttpClient) {
  }

// search movie data entered by user in search bar
searchMovie(movieName: any,pageNumber = 1){
  return this.http.get(AppConfig.search_api+movieName + '&page='+ pageNumber)
}



}