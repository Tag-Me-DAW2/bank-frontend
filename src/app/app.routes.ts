import { Routes } from '@angular/router';
import { ProfilePage } from './components/pages/profile-page/profile-page';

export const routes: Routes = [
    {
        path: 'bank',
        children: [
            { path: 'profile', component: ProfilePage },
        ]
    }
];
