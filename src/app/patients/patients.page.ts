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
import {InfiniteScrollPage} from "../shared/base/infinite-scroll.page";
import {User} from "../shared/model/user.model";
import {EventManager} from "../shared/services/event.manager.service";
import {Patient} from "../shared/model/patient.model";
import {PatientService} from "../shared/services/patient.service";

@Component({
    selector: 'patients-page',
    templateUrl: 'patients.page.html',
    styleUrls: ['patients.page.scss']
})
export class PatientsPage extends InfiniteScrollPage<Patient> {


    constructor(private patientService: PatientService,
                protected eventManager: EventManager) {
        super(patientService, eventManager, {
            sort: ['name,asc']
        });
    }

    trackById(index, item: User): any {
        return item.id;
    }

    create() {

    }
}
