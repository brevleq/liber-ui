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

import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {SERVER_API_URL} from "../../constants/app.constants";
import {concatAll, map} from "rxjs/operators";

export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request || !request.url || (/^http/.test(request.url) && !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))) {
            return next.handle(request);
        }
        return this.getToken()
            .pipe(map(token => {
                    if (!!token) {
                        request = request.clone({
                            setHeaders: {
                                Authorization: 'Bearer ' + token
                            }
                        });
                    }
                    return next.handle(request);
                }), concatAll()
            );
    }

    private getToken(): Observable<string> {
        return new Observable<string>(observer => {
            console.warn('localStorage -> ', this.localStorage);
            console.warn('sessionStorage -> ', this.sessionStorage);
            const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
            observer.next(token);
            observer.complete();
        });
    }

}
