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

import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../constants/app.constants';
import {Observable} from 'rxjs';
import {createRequestOption} from '../model/request-util';
import {IQueryService} from "./iquery.service";

export abstract class QueryService<T> implements IQueryService<T> {
    protected constructor(protected http: HttpClient,
                          protected resourceUrl: string) {
    }

    find(id: any): Observable<HttpResponse<T>> {
        return this.http.get<T>(SERVER_API_URL + `${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<T[]>> {
        const options = createRequestOption(req);
        return this.http.get<T[]>(SERVER_API_URL + this.resourceUrl, {params: options, observe: 'response'});
    }
}
