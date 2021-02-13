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
import {User} from "../shared/model/user.model";
import {AlertController, ModalController} from "@ionic/angular";
import {EventManager} from "../shared/services/event.manager.service";
import {ToastHelper} from "../shared/helpers/toast.helper";
import {AccountService} from "../shared/services/account.service";

@Component({
    selector: 'account-page',
    templateUrl: 'account.page.html',
    styleUrls: ['account.page.scss']
})
export class AccountPage implements OnInit {

    name: string;
    private user: User;

    constructor(private accountService: AccountService,
                private alertController: AlertController,
                private modalController: ModalController,
                protected eventManager: EventManager,
                private toast: ToastHelper) {
        this.user = new User();
    }

    ngOnInit(): void {
        this.accountService.get().subscribe(response => this.load(response.body));
    }

    save() {
        const spaceIndex = this.name.indexOf(' ');
        this.user.firstName = this.name.substring(0, spaceIndex);
        this.user.lastName = this.name.substring(spaceIndex + 1);
        this.accountService.save(this.user).subscribe(
            () => this.toast.showSuccessMessage(),
            () => this.toast.showErrorMessage()
        );
    }

    private load(body: User) {
        this.user = body
        this.name = this.user.firstName + ' ' + this.user.lastName;
    }
}
