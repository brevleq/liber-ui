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

import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoadingService} from '../../services/loading.service';
import {finalize} from "rxjs/operators";

export class LoadingInterceptor implements HttpInterceptor {


    constructor(private loadingService: LoadingService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const params: HttpParams = request.params;
        let page: any;
        let filtering: boolean;
        if (params) {
            page = params.get('page');
            filtering = !!params.get('filtering');
        }
        if ((!page || page === 0) && !filtering &&
            request.url.indexOf('api/file-upload') === -1) {
            this.loadingService.show();
        } else {
            this.loadingService.increaseCounter();
        }
        return next.handle(request).pipe(
            finalize(() => {
                this.loadingService.hide();
            })
        );
    }
}
