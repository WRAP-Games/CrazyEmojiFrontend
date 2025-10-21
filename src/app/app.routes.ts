import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CategoriesPage } from './pages/categories-page/categories-page';
import { WaitingRoomPage } from './pages/waiting-room-page/waiting-room-page';

export const routes: Routes = [
    {
        path: '',
        title: 'Crazy Emoji',
        component: HomePage
    },
    {
        path: 'categories',
        title: 'Categories',
        component: CategoriesPage
    },
    {
        path: 'room/waiting-room',
        title: 'Waiting Room',
        component: WaitingRoomPage
    }
];
