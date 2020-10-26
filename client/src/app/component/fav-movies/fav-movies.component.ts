import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../movies/movie-list/movie-list.component';
import { JsonApiService } from './../../services/json-api.service';

@Component({
	selector: 'app-fav-movies',
	templateUrl: './fav-movies.component.html',
	styleUrls: ['./fav-movies.component.css'],
	providers: [JsonApiService]
})

export class FavMoviesComponent implements OnInit {
	public favMovies: any = [];
	public flag = 'list';

	constructor(private jsonApiService: JsonApiService) {
	}

	ngOnInit() {
		this.getFavourite();
	}

	//get data of favourite movies from database
	getFavourite() {
		this.jsonApiService.getFavourite().subscribe((res) => {
			this.favMovies = res['data'];
		}, (error: any) => {

		})
	}
	setFavMovieList(event) {
		this.favMovies = event.favMovies;
		this.getFavourite();
	}

	updateFavMovieList(data) {
		this.jsonApiService.updateMovie(data).subscribe(res => {
			if (res['success']) {
				this.getFavourite();
			}
		}, err => {

		})
	}

}
