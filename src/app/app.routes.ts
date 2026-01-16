import { Routes } from '@angular/router';
import { ProfilePage } from './components/pages/profile-page/profile-page';
import { MovementsPage } from './components/pages/movements-page/movements-page';
import { LoginPage } from './components/pages/login-page/login-page';

export const routes: Routes = [
    {
        path: '',

        redirectTo: 'bank/login',
        pathMatch: 'full'
    },
    {
        path: 'bank/login',
        component: LoginPage
    },
    {
        path: 'bank',
        children: [
            { path: 'profile/:id', component: ProfilePage },
            { path: 'movements/:id', component: MovementsPage }
        ],
    }
];
