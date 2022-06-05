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

import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {CrudService} from "./crud.service";
import {Hospitalization} from "../model/hospitalization.model";
import {Result} from "../model/result.model";
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../constants/app.constants";

@Injectable({
    providedIn: 'root'
})
export class HospitalizationsService extends CrudService<Hospitalization> {

    constructor(http: HttpClient) {
        super(http, 'api/hospitalizations');
    }

    public isHospitalized(patientId: number): Observable<HttpResponse<Result>> {
        return this.http.get<Result>(SERVER_API_URL + `${this.resourceUrl}/${patientId}/is-hospitalized`, {observe: 'response'});
    }
}
