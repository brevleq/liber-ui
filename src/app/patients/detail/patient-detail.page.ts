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

import {Component, Input} from '@angular/core';
import {ToastHelper} from "../../shared/helpers/toast.helper";
import {Patient} from "../../shared/model/patient.model";
import {PatientService} from "../../shared/services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'patient-detail-page',
    templateUrl: 'patient-detail.page.html',
    styleUrls: ['patient-detail.page.scss']
})
export class PatientDetailPage {

    @Input() patient: Patient;
    documentIds: string[];

    constructor(private toast: ToastHelper,
                private router: Router,
                private patientService: PatientService,
                private activatedRoute: ActivatedRoute) {
        this.patient = new Patient();
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            this.patientService.find(id).subscribe(res => this.loadPatient(res.body));
        });
    }

    private loadPatient(patient: Patient) {
        this.patient = patient;
        this.documentIds = Object.keys(this.patient.documents);
    }
}
