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
import {ToastHelper} from "../shared/helpers/toast.helper";
import {AccountService} from "../shared/services/account.service";
import {ChangePassword} from "../shared/model/change-password.model";

@Component({
    selector: 'password-page',
    templateUrl: 'password.page.html',
    styleUrls: ['password.page.scss']
})
export class PassswordPage {

    model: ChangePassword = new ChangePassword();
    newPasswordRepetition: string;
    passwordDifferentError = false;

    constructor(private accountService: AccountService,
                private toast: ToastHelper) {
    }

    submit() {
        if (this.model.newPassword !== this.newPasswordRepetition) {
            this.passwordDifferentError = true;
            return;
        }
        this.passwordDifferentError = false;
        this.accountService.changePass(this.model).subscribe(
            () => this.toast.showSuccessMessage("Senha trocada com sucesso!"),
            () => this.toast.showErrorMessage("Ocorreu um erro ao trocar sua senha!")
        );
    }
}
