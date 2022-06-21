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
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    private loading: HTMLIonLoadingElement;
    private isShowing = false;
    private isCreatingLoading = false;
    private requestQuantity = 0;

    constructor(private loadingCtrl: LoadingController) {
    }

    async show(): Promise<void> {
        this.requestQuantity++;
        if (!this.isCreatingLoading && !this.loading) {
            this.isCreatingLoading = true;
            this.loading = await this.loadingCtrl.create({spinner: 'circular'});
            this.isCreatingLoading = false;
            if (!this.isShowing && this.requestQuantity > 0) {
                this.loading.present().then(() => {
                    this.isShowing = true;
                });
            }
        }
    }

    hide(): void {
        this.requestQuantity--;
        if (this.requestQuantity < 0) {
            this.requestQuantity = 0;
        }
        if (this.requestQuantity === 0 && this.loading) {
            setTimeout(() => {
                if (this.loading) {
                    this.loading.dismiss().then(() => {
                        this.isShowing = false;
                    });
                    this.loading = null;
                }
            }, 200);
        }
    }

    increaseCounter() {
        this.requestQuantity++;
    }
}
