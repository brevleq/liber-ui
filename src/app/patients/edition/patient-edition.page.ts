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
import * as moment from 'moment';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'patient-edition-page',
    templateUrl: 'patient-edition.page.html',
    styleUrls: ['patient-edition.page.scss']
})
export class PatientEditionPage {

    @Input() patient: Patient;
    documentIds: string[];
    newDocumentRow: { typeId?: number, value?: string };

    constructor(private toast: ToastHelper,
                private router: Router,
                private patientService: PatientService,
                private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if (id)
                this.patientService.find(id).subscribe(res => this.loadPatient(res.body));
            else
                this.loadPatient(new Patient());
        });
    }

    removeDocument(document: any) {
        const documents = this.patient.documents;
        delete documents[document.key];
        this.loadDocumentIds();
    }

    private loadPatient(patient: Patient) {
        this.patient = patient;
        this.loadDocumentIds();
    }

    addDocument() {
        this.putNewDocument();
        this.newDocumentRow = {};
    }

    private loadDocumentIds() {
        this.documentIds = Object.keys(this.patient.documents);
    }

    submit() {
        this.patient.birthDate = moment(this.patient.birthDate).format('YYYY-MM-DD');
        this.putNewDocument();
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

    private putNewDocument() {
        if (this.newDocumentRow && this.newDocumentRow.typeId && this.newDocumentRow.value) {
            this.patient.documents[this.newDocumentRow.typeId] = this.newDocumentRow.value;
            this.loadDocumentIds();
        }
    }

    private onSuccess() {
        this.toast.showSuccessMessage();
        this.router.navigateByUrl('/patients');
    }
}
