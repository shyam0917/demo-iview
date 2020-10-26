import { Component, OnInit } from '@angular/core';
import { JsonApiService } from './../../services/json-api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [ JsonApiService ]
})

export class MoviesComponent implements OnInit {
  public movies =[];
  public hidden=true;
  public errorMsg ='';
  public showError : boolean = false;
  public favMovies=[];
  public flag = 'search';
  public searchText="";
  constructor(private jsonApiService: JsonApiService,
    private messageService: MessageService) { }

  ngOnInit() {

  }

  //to set movielist data from search component
  setMovieList(event){
    this.hidden=false;
    this.movies = event.moviesList;
    this.searchText = event.searchText;
  }


//to set total no of favourite movies on browser  
setFavMovieList(event){
 this.favMovies=event.favMovies;
}



}

