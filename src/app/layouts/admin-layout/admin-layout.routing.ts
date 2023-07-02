import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
<<<<<<< HEAD
import { AddCongeComponent } from '../../pages/add-conge/add-conge.component';
=======
import {AddPostComponent} from "../../pages/add-post/add-post.component";
>>>>>>> 03c00adac43866cd73e8563e64f6d8cb4067f051

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'addConge',      component: AddCongeComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'Post',           component: AddPostComponent },
];
