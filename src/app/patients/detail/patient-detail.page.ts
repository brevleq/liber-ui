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
import {ReportService} from "../../shared/services/report.service";
import {InfiniteScrollPage} from "../../shared/base/infinite-scroll.page";
import {Report} from "../../shared/model/report.model";
import {EventManager} from "../../shared/services/event.manager.service";
import {Principal} from "../../shared/auth/principal.service";
import {User} from "../../shared/model/user.model";
import {ModalController} from "@ionic/angular";
import {HospitalizationStartModal} from "../../hospitalizations/start/hospitalization-start.modal";
import {HospitalizationsService} from "../../shared/services/hospitalizations.service";
import {HospitalizationEndModal} from "../../hospitalizations/end/hospitalization-end.modal";
import {Hospitalization} from "../../shared/model/hospitalization.model";

@Component({
    selector: 'patient-detail-page',
    templateUrl: 'patient-detail.page.html',
    styleUrls: ['patient-detail.page.scss']
})
export class PatientDetailPage extends InfiniteScrollPage<Report> {

    @Input() patient: Patient;
    hospitalization: Hospitalization;
    user: User;
    documentIds: string[];

    constructor(private toast: ToastHelper,
                private router: Router,
                private patientService: PatientService,
                private activatedRoute: ActivatedRoute,
                private reportService: ReportService,
                protected eventManager: EventManager,
                private principal: Principal,
                private modalController: ModalController,
                private hospitalizationService: HospitalizationsService) {
        super(reportService, eventManager, {sort: ['createdDate,desc']})
        this.patient = new Patient();
        this.principal.identity().then(u => this.user = u);
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            this.patientService.find(id).subscribe(res => this.loadPatient(res.body));
            this.hospitalizationService.findCurrent(id).subscribe(res => this.hospitalization = res.body);
        });
    }

    trackById(index, item: Report): any {
        return item.id;
    }

    ionViewWillEnter() {
        //    override parent's method
    }

    private loadPatient(patient: Patient) {
        this.patient = patient;
        this.documentIds = Object.keys(this.patient.documents);
        this.queryObject.patientId = this.patient.id;
        super.cleanLoad();
    }

    public async hospitalize() {
        const modal = await this.modalController.create({
            component: HospitalizationStartModal,
            componentProps: {
                patient: this.patient
            }
        });
        modal.present();
        modal.onDidDismiss().then(result => this.hospitalization = result.data);
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
        modal.onDidDismiss().then((result) => this.hospitalization = result.data);
    }
}
