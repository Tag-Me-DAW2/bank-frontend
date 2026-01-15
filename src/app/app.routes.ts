import { Routes } from '@angular/router';
import { ProfilePage } from './components/pages/profile-page/profile-page';
import { MovementsPage } from './components/pages/movements-page/movements-page';

export const routes: Routes = [
    {
        path: 'bank',
        children: [
            { path: 'profile/:id', component: ProfilePage },
            { path: 'movements/:id', component: MovementsPage }
        ]
    }
];
