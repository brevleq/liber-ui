/*
 * Copyright (c) 2020 - 2021 Hudson Orsine Assumpção.
 *
 * This file is part of Liber UI.
 *
 * Liber UI is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any later
 * version.
 *
 * Liber UI is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Liber UI.  If not, see <https://www.gnu.org/licenses/>
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from "./home.page";
import {UserRouteAccessService} from "../shared/auth/user-route-access-service";


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'users',
        canActivate: [UserRouteAccessService],
        data: {
          authorities: ['ROLE_ADMIN'],
        },
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
      }, {
        path: 'patients',
        canActivate: [UserRouteAccessService],
        data: {
          authorities: ['ROLE_DENTIST', 'ROLE_PSYCHOLOGIST', 'ROLE_PSYCHIATRIST', 'ROLE_SOCIAL_ASSISTANT'],
        },
        loadChildren: () => import('../patients/patients.module').then(m => m.PatientsModule)
      }, {
        path: 'account',
        canActivate: [UserRouteAccessService],
        data: {
          authorities: ['ROLE_ADMIN', 'ROLE_DENTIST', 'ROLE_PSYCHOLOGIST', 'ROLE_PSYCHIATRIST', 'ROLE_SECRETARY', 'ROLE_SOCIAL_ASSISTANT'],
        },
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
      }, {
        path: 'password',
        canActivate: [UserRouteAccessService],
        data: {
          authorities: ['ROLE_ADMIN', 'ROLE_DENTIST', 'ROLE_PSYCHOLOGIST', 'ROLE_PSYCHIATRIST', 'ROLE_SECRETARY', 'ROLE_SOCIAL_ASSISTANT'],
        },
        loadChildren: () => import('../password/password.module').then(m => m.PasswordModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
