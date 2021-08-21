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
import {Principal} from '../auth/principal.service';
import {AuthServerProvider} from '../auth/auth-jwt.service';
import {EventManager} from "./event.manager.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private principal: Principal,
                private authServerProvider: AuthServerProvider,
                private router: Router,
                private eventManager: EventManager) {
    }

    login(credentials) {
        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe(
                data => {
                    this.principal.identity(true).then(account => {
                        this.eventManager.broadcast({name: 'logged-in'});
                        resolve(data);
                    }).catch(error => {
                        this.logout();
                        reject(error);
                    });
                },
                err => {
                    this.logout();
                    reject(err);
                }
            );
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
        this.router.navigateByUrl('/login');
    }
}
