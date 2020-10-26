import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TmdbApiService } from './../../../services/tmdb-api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css'],
  providers: [TmdbApiService]
})

export class MovieSearchComponent implements OnInit {
  @Output() success = new EventEmitter<any>();
  public moviesList = [];
  public movieSearch: string;
  public searchResult: boolean = false;

  constructor(private tmdbApiService: TmdbApiService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {

  }

  // Function to get search text and make service call to get movies from TMDB
  searchMovie() {
    this.spinner.show();
    this.tmdbApiService.searchMovie(this.movieSearch,1).subscribe((res) => {
      this.moviesList = res['results'];
      if (this.moviesList.length == 0) {
        this.searchResult = true;
      }
      else {
        this.searchResult = false;
      }
      this.onEventEmit(this.moviesList);
      sessionStorage.setItem('total', res['total_pages']);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    })
  }

  //send movielist to the movies component
  onEventEmit(moviesList: any) {
    this.success.emit({
      'moviesList': moviesList,
      'searchText': this.movieSearch
    });
  }
}



