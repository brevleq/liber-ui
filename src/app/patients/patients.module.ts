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
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SharedModule} from "../shared/shared.module";
import {PatientsPage} from "./patients.page";
import {PatientsRoutingModule} from "./patients-routing.module";
import {PatientEditionPage} from "./edition/patient-edition.page";
import {PatientDetailPage} from "./detail/patient-detail.page";

@NgModule({
    declarations: [
        PatientsPage,
        PatientDetailPage,
        PatientEditionPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SharedModule,
        IonicModule,
        PatientsRoutingModule
    ]
})
export class PatientsModule {
}
