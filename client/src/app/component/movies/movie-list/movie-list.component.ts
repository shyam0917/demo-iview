import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppConfig } from './../../../config/config.constant';
import { TmdbApiService } from 'src/app/services/tmdb-api.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [TmdbApiService]
})

export class MovieListComponent implements OnInit {
  @ViewChild('cl') closebutton;
  @Input() movies: Array<any> = [];
  @Input() flag: string;
  @Input() searchText: string;
  @Output() favArray = new EventEmitter();
  @Output() updArray = new EventEmitter();
  public movieUrl = AppConfig.baseUrl;
  public favMovies = [];
  public errorMsg = "";
  public total: number = 0;
  p: number = 1;
  public displayError: boolean = false;
  constructor(private tmdbApiService: TmdbApiService) {
    if (sessionStorage.getItem('total')) {
      this.total = parseInt(sessionStorage.getItem('total'));
    }
  }

  ngOnInit() {
    this.displayError = false;
  }

  setFavMovieList(event) {
    this.favMovies = event.favMovies;
    this.favArray.emit({
      'favMovies': this.favMovies
    });
  }

  //show error on the browser if user added duplicate movies
  showError(event) {
    this.displayError = false;
    this.errorMsg = event.errMsg;
    if (this.errorMsg != "") {
      this.displayError = true;
    }
  }

  // on submit
  onSubmit(value: any) {
    this.closebutton.nativeElement.click();
    this.updArray.emit(value);
    window.location.reload();
  }

  // on page Change
  pageChanged(event) {
    console.log("ev",event);
    this.changePage(event);
  }

  // change page
  changePage(page) {
    this.tmdbApiService.searchMovie(this.searchText, page).subscribe((res) => {
      this.movies = res['results'];
    }, (error) => {
    })
  }





}
