import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [

    {
        path:"",
        redirectTo:"home",
        pathMatch:'full'
    },

    {
        path:"home",
        component:HomeComponent
    },

    {
        path:"search/:fromStationId/:toStationId/:dateOfBooking",
        component:SearchComponent
    }
];
