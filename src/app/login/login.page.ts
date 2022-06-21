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

import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LoginService} from "../shared/services/login.service";
import {ToastHelper} from "../shared/helpers/toast.helper";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {

    public credentials: { username?: string, password?: string } = {};
    private subscription: Subscription;

    constructor(private loginService: LoginService,
                private toastHelper: ToastHelper,
                private router: Router) {
    }

    onSubmit() {
        this.loginService.login(this.credentials).then(
            () => this.router.navigateByUrl('/')
        ).catch(
            (e) => {
                this.toastHelper.showErrorMessage('Verifique o login e senha e tente novamente')
            }
        );
    }

    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe()
    }
}
