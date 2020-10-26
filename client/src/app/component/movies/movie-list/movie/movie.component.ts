import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { JsonApiService } from './../../../../services/json-api.service';
import { AppConfig } from './../../../../config/config.constant';
import { MessageService } from 'src/app/services/message.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [JsonApiService]

})

export class MovieComponent implements OnInit {
  @Input() movie: any;
  @Input() flag: any;
  @Output() favArray = new EventEmitter();
  @Output() err = new EventEmitter();
  public movieUrl = AppConfig.baseUrl;
  public favMovies: any = [];
  public selectedMovie: any;
  closeResult = '';
  constructor(private jsonApiService: JsonApiService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private router: Router) {
  }

  ngOnInit() {
  }

  // Add favourite movie to  database
  addToFavorite(movie) {
    if(localStorage.getItem('token')){
    let movieData = {
      userId: localStorage.getItem('userId'),
      movie: movie
    }
    this.messageService.showLoader(true);
    this.jsonApiService.addToFavourite(movieData).subscribe((res) => {
      this.getFavorite();
      this.messageService.showLoader(false);
      this.messageService.handleSuccess(res);
    }, (error: any) => {
      this.messageService.showLoader(false);
      this.messageService.handleError(error);
    })
  }else{
    this.router.navigate(['/login']);
  }}

  // get data of favourite movies from database
  getFavorite() {
    this.jsonApiService.getFavourite().subscribe((res) => {
      this.favMovies = res['result'];
      this.favArray.emit({
        'favMovies': this.favMovies
      });
    }, (error: any) => {
      this.messageService.handleError(error);
    })
  }

  //Delete movie from database
  deleteMovie(movieId) {
    let movieData = {
      userId: localStorage.getItem('userId'),
      movieId: movieId
    }
    this.messageService.showLoader(true);
    this.jsonApiService.deleteMovie(movieData).subscribe(data => {
      this.favMovies = data;
      this.messageService.showLoader(false);
      this.messageService.handleSuccess(data);
      this.favArray.emit({
        'favMovies': this.favMovies
      });
    }, (error: any) => {
      this.messageService.showLoader(false);
      this.messageService.handleError(error);
    })
  }

  // Set Movie details to update
  setMovie(movie) {
    this.selectedMovie = movie;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.getFavorite();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  update(movie) {
    let movieData = {
      userId: localStorage.getItem('userId'),
      movie: {
        movieId: movie._id,
        title: movie.title,
        overview: movie.overview,
        vote_average: movie.vote_average
      }
    }
    this.messageService.showLoader(true);
    this.jsonApiService.updateMovie(movieData).subscribe(res => {
      this.modalService.dismissAll();
      this.messageService.showLoader(false);
     this.messageService.handleSuccess(res);
    }, err => {
      this.messageService.showLoader(false);
      this.messageService.handleError(err);
    })

  }

}


