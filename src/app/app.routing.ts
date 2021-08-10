import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CityDetailsComponent } from './city-details/city-details.component';
import { AuthGuard } from './helper/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutComponent },
    { path: 'city/:name', component: CityDetailsComponent },
    { path: '**', redirectTo: 'home' }
];

export const appRoutingModule = RouterModule.forRoot(routes);