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
import {Report, ReportStatus, ReportType} from "../../shared/model/report.model";
import {ReportService} from "../../shared/services/report.service";
import {Principal} from "../../shared/auth/principal.service";
import {Patient} from "../../shared/model/patient.model";
import {PatientService} from "../../shared/services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastHelper} from "../../shared/helpers/toast.helper";

@Component({
    selector: 'report-edition-page',
    templateUrl: 'report-edition.page.html',
    styleUrls: ['report-edition.page.scss']
})
export class ReportEditionPage {

    report: Report;
    patient: Patient;

    constructor(private reportService: ReportService,
                private principal: Principal,
                private patientService: PatientService,
                private activatedRoute: ActivatedRoute,
                private toast: ToastHelper,
                private router: Router) {
        this.activatedRoute.params.subscribe(params => {
            const reportId = params['reportId'];
            const patientId = params['patientId'];
            if (reportId)
                this.loadExistingReport(reportId);
            else
                this.createNewReport(patientId)
        });
    }

    submit() {
        this.report.status = ReportStatus.PUBLISHED;
        if (!this.report.id)
            this.reportService.create(this.report).subscribe(
                () => this.onSuccess(),
                () => this.onError()
            );
        else
            this.reportService.update(this.report).subscribe(
                () => this.onSuccess(),
                () => this.onError()
            );

    }

    private loadExistingReport(reportId: number) {
        this.reportService.find(reportId).subscribe(
            res => {
                this.report = res.body;
                this.patientService.find(this.report.patientId).subscribe(r => this.patient = r.body);
            }
        )
    }

    private createNewReport(patientId: number) {
        this.report = new Report();
        this.report.type = this.retrieveType();
        this.report.patientId = patientId;
        this.patientService.find(patientId).subscribe(res => this.patient = res.body);
        this.principal.identity().then(u => this.report.authorId = u.id);
    }

    private retrieveType(): ReportType {
        if (this.principal.hasAnyAuthorityDirect(['ROLE_DENTIST']))
            return ReportType.DENTAL;
        if (this.principal.hasAnyAuthorityDirect(['ROLE_PSYCHOLOGIST']))
            return ReportType.PSYCHOLOGICAL;
        if (this.principal.hasAnyAuthorityDirect(['ROLE_PSYCHIATRIST']))
            return ReportType.PSYCHIATRIC;
        if (this.principal.hasAnyAuthorityDirect(['ROLE_SOCIAL_ASSISTANT']))
            return ReportType.SOCIAL;
        return null;
    }

    private onSuccess() {
        this.toast.showSuccessMessage();
        this.router.navigateByUrl('/patients/detail/' + this.report.patientId);
    }

    private onError() {
        this.toast.showErrorMessage();
    }
}
