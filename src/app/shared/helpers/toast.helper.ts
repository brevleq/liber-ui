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
import {ToastController} from '@ionic/angular';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class ToastHelper {
    constructor(private toastController: ToastController,
                private translate: TranslateService) {
    }

    showSuccessMessage(message?: string) {
        if (message)
            this.showToast(message, 'success');
        else
            this.translate.get('common.success').subscribe(translated => this.showToast(translated, 'success'));
    }

    showErrorMessage(message?: string) {
        if (message)
            this.showToast(message, 'danger');
        else
            this.translate.get('common.error').subscribe(translated => this.showToast(translated, 'danger'));
    }

    private async showToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message: message,
            color: color,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }
}
