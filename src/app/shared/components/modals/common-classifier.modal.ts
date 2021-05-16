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

import {Component, Input} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {InfiniteScrollPage} from "../../base/infinite-scroll.page";
import {CommonClassifier} from "../../model/common-classifier.model";
import {CrudService} from "../../services/crud.service";
import {EventManager} from "../../services/event.manager.service";
import {ToastHelper} from "../../helpers/toast.helper";
import {QueryService} from "../../services/query.service";

@Component({
    selector: 'common-classifier-modal',
    templateUrl: 'common-classifier.modal.html',
    styleUrls: ['common-classifier.modal.scss']
})
export class CommonClassifierModal extends InfiniteScrollPage<CommonClassifier> {

    @Input() title: string;
    @Input() crudService: CrudService<CommonClassifier> | QueryService<CommonClassifier>;
    canCreate: boolean;
    private selected: CommonClassifier;

    constructor(protected eventManager: EventManager,
                private toast: ToastHelper,
                private modalController: ModalController) {
        super(null, eventManager, {sort: ['name,asc']});
    }

    ionViewWillEnter() {
        this.queryService = this.crudService;
        this.canCreate = this.crudService instanceof CrudService;
        super.ionViewWillEnter();
    }

    trackById(index, item: CommonClassifier): any {
        return item.id;
    }

    select(item: CommonClassifier) {
        this.selected = item;
    }

    createAndSelect() {
        if (!this.canCreate)
            return;
        const item = new CommonClassifier();
        item.name = this.filter;
        (this.crudService as CrudService<CommonClassifier>).create(item).subscribe(
            res => {
                this.selected = res.body;
                this.close();
            },
            error => this.toast.showErrorMessage()
        );
    }

    close() {
        this.modalController.dismiss({
            item: this.selected
        });
    }
}
