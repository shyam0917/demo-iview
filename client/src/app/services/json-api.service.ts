import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig }from '../config/config.constant';

@Injectable()
export class JsonApiService {

  constructor(private http: HttpClient) { 
  }

  //to signup user
signUp(user={}){ 
  return this.http.post(AppConfig.apiUrl+'signup', user);
}

  //to login user
  login(loginData={}){ 
    return this.http.post(AppConfig.apiUrl+'login', loginData);
  }

//to save favourite movie
addToFavourite(movieData){ 
  return this.http.post(AppConfig.apiUrl+'addMovie', movieData);
}

// to get favourite movies
getFavourite(){ 
  let userId = localStorage.getItem('userId');
  return this.http.get(AppConfig.apiUrl+`movies/${userId}`);
}

// to delete favourite movies
deleteMovie(movieData){ 
  return this.http.post(AppConfig.apiUrl+ 'deleteMovie',movieData);
}

// update movie
updateMovie(movieData){ 
  return this.http.post(AppConfig.apiUrl+'updateMovie', movieData);
}

}
