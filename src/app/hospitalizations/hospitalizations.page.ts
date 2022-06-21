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

import {Component} from '@angular/core';
import {HospitalizationsService} from "../shared/services/hospitalizations.service";
import {Hospitalization} from "../shared/model/hospitalization.model";
import {InfiniteScrollPage} from "../shared/base/infinite-scroll.page";
import {EventManager} from "../shared/services/event.manager.service";
import {DeletionService} from "../shared/services/deletion.service";
import {ActivatedRoute} from "@angular/router";
import {HospitalizationStartModal} from "./start/hospitalization-start.modal";
import {HospitalizationEndModal} from "./end/hospitalization-end.modal";
import {ModalController} from "@ionic/angular";
import {PatientService} from "../shared/services/patient.service";
import {Patient} from "../shared/model/patient.model";

@Component({
    selector: 'hospitalizations-page',
    templateUrl: 'hospitalizations.page.html',
    styleUrls: ['hospitalizations.page.scss']
})
export class HospitalizationsPage extends InfiniteScrollPage<Hospitalization> {

    patientId: number;
    hospitalization: Hospitalization;
    patient: Patient;

    constructor(private hospitalizationService: HospitalizationsService,
                private patientService: PatientService,
                protected eventManager: EventManager,
                private deletionService: DeletionService,
                private modalController: ModalController,
                private activatedRoute: ActivatedRoute) {
        super(hospitalizationService, eventManager, {
            sort: ['startDate,desc']
        });
        this.activatedRoute.params.subscribe(params => {
            this.patientId = params['patientId'];
            this.patientService.find(this.patientId).subscribe(res => this.patient = res.body);
            this.hospitalizationService.findCurrent(this.patientId).subscribe(res => this.hospitalization = res.body);
            this.queryObject.patientId = this.patientId;
        });
    }

    trackById(index, item: Hospitalization): any {
        return item.patientId;
    }

    tryDelete(hospitalization: Hospitalization) {
        this.deletionService.delete({
            item: hospitalization,
            crudService: this.hospitalizationService
        }).subscribe(result => this.onDeletionSuccess(result))
    }

    private onDeletionSuccess(hospitalization: any) {
        const found = this.items.find(r => r.patientId === hospitalization.patientId);
        const index = this.items.indexOf(found);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    public async hospitalize() {
        const modal = await this.modalController.create({
            component: HospitalizationStartModal,
            componentProps: {
                patient: this.patient
            }
        });
        modal.present();
        modal.onDidDismiss().then(result => {
            this.hospitalization = result.data;
            this.cleanLoad();
        });
    }

    async finishHospitalization() {
        const modal = await this.modalController.create({
            component: HospitalizationEndModal,
            componentProps: {
                patient: this.patient,
                hospitalization: this.hospitalization
            }
        });
        modal.present();
        modal.onDidDismiss().then((result) => {
            this.hospitalization = result.data;
            this.cleanLoad();
        });
    }

}
