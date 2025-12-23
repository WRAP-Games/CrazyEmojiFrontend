import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { CategoriesPage } from './pages/categories-page/categories-page';
import { WaitingRoomPage } from './pages/waiting-room-page/waiting-room-page';
import { GameRoomPage } from './pages/game-room-page/game-room-page';
import { Playground } from './playground/playground';

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
    },
    {
        path: 'room/game-room',
        title: 'Waiting Room',
        component: GameRoomPage
    },
    {
        path: 'playground',
        title: 'Playground',
        component: Playground
    }
];
