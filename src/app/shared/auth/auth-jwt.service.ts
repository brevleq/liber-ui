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
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SERVER_API_URL} from "../constants/app.constants";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";

@Injectable({
    providedIn: 'root'
})
export class AuthServerProvider {
    constructor(private http: HttpClient,
                private localStorage: LocalStorageService,
                private sessionStorage: SessionStorageService) {
    }

    login(credentials): Observable<any> {
        return this.http
            .post(SERVER_API_URL + 'api/authenticate', credentials, {observe: 'response'})
            .pipe(map(authenticateSuccess.bind(this)));

        function authenticateSuccess(resp) {
            const bearerToken = resp.headers.get('Authorization');
            if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
                const jwt = bearerToken.slice(7, bearerToken.length);
                this.storeAuthenticationToken(jwt, credentials.rememberMe);
                return jwt;
            }
        }
    }

    loginWithToken(jwt, rememberMe) {
        if (jwt) {
            this.storeAuthenticationToken(jwt, rememberMe);
            return Promise.resolve(jwt);
        } else {
            return Promise.reject('auth-jwt-service Promise reject'); // Put appropriate error message here
        }
    }

    logout(): Observable<any> {
        return new Observable(observer => {
            this.localStorage.clear('authenticationToken');
            this.sessionStorage.clear('authenticationToken');
            observer.next();
            observer.complete();
        });
    }

    private storeAuthenticationToken(jwt, rememberMe) {
        if (rememberMe) {
            this.localStorage.store('authenticationToken', jwt);
        } else {
            this.sessionStorage.store('authenticationToken', jwt);
        }
    }
}
