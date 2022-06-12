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
import {Observable, Subscriber} from 'rxjs';
import {AlertController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";
import {CrudService} from "./crud.service";
import {ToastHelper} from "../helpers/toast.helper";

@Injectable({
    providedIn: 'root'
})
export class DeletionService {

    private translation: any;

    constructor(private alertController: AlertController,
                private translate: TranslateService,
                private toast: ToastHelper) {
        translate.get([
            'common.deletion.title',
            'common.deletion.message',
            'common.deletion.yes',
            'common.deletion.no',
            'common.deletion.success',
            'common.deletion.error',
        ])
            .subscribe(result => this.translation = result);
    }

    delete(obj: { item: any, idProperty?: string, crudService: CrudService<any> }) {
        return new Observable((observer) => {
            this.alertController.create({
                header: this.translation['common.deletion.title'],
                message: this.translation['common.deletion.message'],
                buttons: [
                    {
                        role: 'confirm',
                        text: this.translation['common.deletion.yes'],
                        handler: () => this.deletionConfirmed(obj, observer)
                    },
                    {
                        role: 'cancel',
                        text: this.translation['common.deletion.no'],
                        handler: () => this.complete(null, observer)
                    }
                ]
            }).then(alert => {
                alert.present();
            });
        });
    }

    private complete(item: any, observer: Subscriber<any>) {
        if (item)
            observer.next(item);
        observer.complete();
    }

    private deletionConfirmed(obj: { item: any, idProperty?: string, crudService: CrudService<any> }, observer: Subscriber<any>) {
        let param = obj.item;
        if (obj.idProperty)
            param = obj.item[obj.idProperty]
        obj.crudService.delete(param).subscribe(
            () => this.onDeletionSuccess(obj.item, observer),
            () => this.onDeletionError(observer)
        );
    }

    private onDeletionSuccess(item: any, observer: Subscriber<any>) {
        this.toast.showSuccessMessage(this.translation['common.deletion.success']);
        this.complete(item, observer);
    }

    private onDeletionError(observer: Subscriber<any>) {
        this.toast.showErrorMessage(this.translation['common.deletion.error']);
        this.complete(null, observer);
    }
}
