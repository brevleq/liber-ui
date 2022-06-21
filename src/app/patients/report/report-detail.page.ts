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
import {Report} from "../../shared/model/report.model";
import {ReportService} from "../../shared/services/report.service";
import {Principal} from "../../shared/auth/principal.service";
import {Patient} from "../../shared/model/patient.model";
import {PatientService} from "../../shared/services/patient.service";
import {ActivatedRoute} from "@angular/router";
import {PopoverController} from "@ionic/angular";
import {ReportOptionsComponent} from "./report-options.component";

@Component({
    selector: 'report-detail-page',
    templateUrl: 'report-detail.page.html',
    styleUrls: ['report-detail.page.scss']
})
export class ReportDetailPage {

    report: Report;
    patient: Patient;

    constructor(private reportService: ReportService,
                private principal: Principal,
                private patientService: PatientService,
                private activatedRoute: ActivatedRoute,
                private popoverController: PopoverController) {
        this.activatedRoute.params.subscribe(params => {
            const reportId = params['reportId'];
            if (reportId)
                this.loadExistingReport(reportId);
        });
    }

    async showOptions(event) {
        const popover = await this.popoverController.create({
            component: ReportOptionsComponent,
            event: event,
            translucent: true
        });
        await popover.present();

        // const {role} = await popover.onDidDismiss();

    }

    private loadExistingReport(reportId: number) {
        this.reportService.find(reportId).subscribe(
            res => {
                this.report = res.body;
                this.patientService.find(this.report.patientId).subscribe(r => this.patient = r.body);
            }
        )
    }
}
