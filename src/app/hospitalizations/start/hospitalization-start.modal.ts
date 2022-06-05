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
import {ModalController} from '@ionic/angular';
import {ToastHelper} from "../../shared/helpers/toast.helper";
import {Patient} from "../../shared/model/patient.model";
import {HospitalizationsService} from "../../shared/services/hospitalizations.service";
import {Hospitalization} from "../../shared/model/hospitalization.model";
import * as moment from "moment";

@Component({
    selector: 'hospitalization-start-modal',
    templateUrl: 'hospitalization-start.modal.html',
    styleUrls: ['hospitalization-start.modal.scss']
})
export class HospitalizationStartModal implements OnInit {

    @Input() patient: Patient;
    public hospitalization: Hospitalization;

    constructor(private modalController: ModalController,
                private toast: ToastHelper,
                private hospitalizationService: HospitalizationsService) {
    }

    ngOnInit(): void {
        this.hospitalization = new Hospitalization();
        this.hospitalization.patientId = this.patient.id;
    }

    close(result?: boolean) {
        this.modalController.dismiss(result);
    }

    submit() {
        this.hospitalization.startDate = moment(this.hospitalization.startDate).format('YYYY-MM-DD');
        this.hospitalizationService.create(this.hospitalization).subscribe(
            () => this.onSuccess(),
            () => this.toast.showErrorMessage()
        );
    }

    private onSuccess() {
        this.toast.showSuccessMessage();
        this.close(true);
    }
}
