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
import {PatientsPage} from './patients.page';
import {PatientEditionPage} from "./edition/patient-edition.page";
import {PatientDetailPage} from "./detail/patient-detail.page";
import {ReportEditionPage} from "./report/report-edition.page";
import {ReportDetailPage} from "./report/report-detail.page";
import {HospitalizationsPage} from "../hospitalizations/hospitalizations.page";

const routes: Routes = [
    {
        path: '',
        component: PatientsPage
    }, {
        path: 'new',
        component: PatientEditionPage
    }, {
        path: 'edit/:id',
        component: PatientEditionPage
    }, {
        path: 'detail/:id',
        component: PatientDetailPage
    }, {
        path: ':patientId/report/new',
        component: ReportEditionPage
    }, {
        path: ':patientId/report/:reportId/edit',
        component: ReportEditionPage
    }, {
        path: ':patientId/report/:reportId',
        component: ReportDetailPage
    }, {
        path: ':patientId/hospitalizations',
        component: HospitalizationsPage
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class PatientsRoutingModule {
}
