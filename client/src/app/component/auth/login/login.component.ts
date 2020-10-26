import { Component, OnInit } from '@angular/core';
import { JsonApiService } from 'src/app/services/json-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [JsonApiService]
})
export class LoginComponent implements OnInit {
  loginDetails = {
    email: "",
    password: ""
  }

  constructor(private jsonApiService: JsonApiService,
    private router: Router) { }

  ngOnInit(): void {
  }

  doLogin(form) {
    let logindata = {
      email: form.form.value.email,
      password: form.form.value.password
    }
    this.jsonApiService.login(logindata).subscribe(res => {
      if (res['success']) {
       localStorage.setItem('token',res['token']);
       localStorage.setItem('userId', res['userId']);
       this.router.navigate(['/favourite'])
      }
    }, err => {
      console.log("err", err);
    })

  }

}
