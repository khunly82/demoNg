import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'member/register', 
        loadComponent: () => import('./features/member/pages/register/register.component').then(c => c.RegisterComponent)  
    }
];
