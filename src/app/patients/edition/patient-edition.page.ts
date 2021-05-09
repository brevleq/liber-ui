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

import {Component, Input, OnInit} from '@angular/core';
import {ToastHelper} from "../../shared/helpers/toast.helper";
import {Patient} from "../../shared/model/patient.model";
import {PatientService} from "../../shared/services/patient.service";

@Component({
    selector: 'patient-edition-page',
    templateUrl: 'patient-edition.page.html',
    styleUrls: ['patient-edition.page.scss']
})
export class PatientEditionPage implements OnInit {

    @Input() patient: Patient;

    constructor(private toast: ToastHelper,
                private patientService: PatientService) {
        this.patient = new Patient();
    }

    ngOnInit(): void {
    }

    submit() {
        if (this.patient.id) {
            this.patientService.update(this.patient).subscribe(
                () => this.onSuccess(),
                () => this.toast.showErrorMessage()
            );
        } else {
            this.patientService.create(this.patient).subscribe(
                () => this.onSuccess(),
                () => this.toast.showErrorMessage()
            );
        }
    }


    private onSuccess() {
        this.toast.showSuccessMessage();
    }
}
