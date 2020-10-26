import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	currentState: boolean = false;
	constructor(private router: Router) {
		this.router.events.subscribe(event=>{
			if (localStorage.getItem('token')) {
				this.currentState = true;
			} else {
				this.currentState = false;
			}
		  })
	}

	ngOnInit() {
	}

	logout() {
		localStorage.clear();
		this.currentState = false;
		this.router.navigate(['/home']);
	}

}
