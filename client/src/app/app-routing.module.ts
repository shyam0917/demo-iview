import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './component/movies/movies.component';
import { RouterModule, Routes} from '@angular/router';
import { FavMoviesComponent } from './component/fav-movies/fav-movies.component';
import { LoginComponent } from './component/auth/login/login.component';
import { SignupComponent } from './component/auth/signup/signup.component';
import { AuthGuard } from './services/auth.guard';

const routes :Routes = [
{path: '', redirectTo:'/home',pathMatch:'full'},
{path: 'home', component:MoviesComponent},
{path: 'login', component:LoginComponent},
{path: 'signup', component:SignupComponent},
{path: 'favourite', component:FavMoviesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  CommonModule
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
