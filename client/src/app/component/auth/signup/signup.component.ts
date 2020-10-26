import { Component, OnInit } from '@angular/core';
import { JsonApiService } from 'src/app/services/json-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [JsonApiService]
})
export class SignupComponent implements OnInit {
  userDetails = {
    name: "",
    email: "",
    password: ""
  }

  constructor(private jsonApiService: JsonApiService,
    private router: Router) { }

  ngOnInit(): void {
  }

  doSignUp(form) {
    let userdata = {
      name: form.form.value.name,
      email: form.form.value.email,
      password: form.form.value.password
    }
    this.jsonApiService.signUp(userdata).subscribe(res => {
      if (res['success']) {
        this.router.navigate(['/login']);
      }
    }, err => {
      console.log("err", err);
    })

  }

}
