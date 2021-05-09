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
import {ModalController} from '@ionic/angular';
import {EventManager} from "../../services/event.manager.service";
import {ToastHelper} from "../../helpers/toast.helper";
import {CommonClassifierModal} from "./common-classifier.modal";
import {MaritalStatusService} from "../../services/marital-status.service";

@Component({
    selector: 'marital-status-modal',
    templateUrl: 'common-classifier.modal.html',
    styleUrls: ['common-classifier.modal.scss']
})
export class MaritalStatusModal extends CommonClassifierModal {

    constructor(crudService: MaritalStatusService, eventManager: EventManager, toast: ToastHelper, modalController: ModalController) {
        super(crudService, eventManager, toast, modalController);
    }
}
