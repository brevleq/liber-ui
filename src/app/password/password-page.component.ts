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

import {Component, OnInit} from '@angular/core';
import {ToastHelper} from "../shared/helpers/toast.helper";
import {AccountService} from "../shared/services/account.service";
import {ChangePassword} from "../shared/model/change-password.model";
import {Router} from "@angular/router";

@Component({
    selector: 'password-page',
    templateUrl: 'password.page.html',
    styleUrls: ['password.page.scss']
})
export class PasswordPage implements OnInit {

    model: ChangePassword = new ChangePassword();
    newPasswordRepetition: string;
    passwordDifferentError = false;
    isChangingDefaultPassword = false;

    constructor(private accountService: AccountService,
                private router: Router,
                private toast: ToastHelper) {
    }

    ngOnInit(): void {
        this.isChangingDefaultPassword = this.router.url.endsWith('change-default-password');
    }

    submit() {
        if (this.model.newPassword !== this.newPasswordRepetition) {
            this.passwordDifferentError = true;
            return;
        }
        this.passwordDifferentError = false;
        this.accountService.changePass(this.model).subscribe(
            () => this.onSuccess(),
            () => this.toast.showErrorMessage("Ocorreu um erro ao trocar sua senha!")
        );
    }

    private onSuccess() {
        this.toast.showSuccessMessage("Senha trocada com sucesso!")
        if (this.isChangingDefaultPassword)
            this.router.navigateByUrl("/", {replaceUrl: true}).then((result) => console.log('mudou a página?', result));
    }
}
