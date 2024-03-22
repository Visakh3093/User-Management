import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { StudentHomeComponent } from './components/student-home/student-home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
       path:'',
       component:HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'user-details/:id',
        component:UserDetailsComponent
    },
    {
        path:'student',
        component:StudentHomeComponent
    },
    {
        path:'**',
        component:PageNotFoundComponent
    }
];
