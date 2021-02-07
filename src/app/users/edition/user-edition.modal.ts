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

import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {User} from "../../shared/model/user.model";
import {ToastHelper} from "../../shared/helpers/toast.helper";
import {UserService} from "../../shared/services/user.service";

@Component({
    selector: 'user-edition-modal',
    templateUrl: 'user-edition.modal.html',
    styleUrls: ['user-edition.modal.scss']
})
export class UserEditionModal implements OnInit {

    @Input() user: User;
    isAdmin: boolean;
    isDentist: boolean;
    isPsychologist: boolean;
    isPsychiatrist: boolean;
    isSecretary: boolean;
    isSocialAssistant: boolean;
    name: string;

    constructor(private modalController: ModalController,
                private toast: ToastHelper,
                private userService: UserService) {
    }

    ngOnInit(): void {
        this.isAdmin = this.hasAuthority('ROLE_ADMIN');
        this.isDentist = this.hasAuthority('ROLE_DENTIST');
        this.isPsychologist = this.hasAuthority('ROLE_PSYCHOLOGIST');
        this.isPsychiatrist = this.hasAuthority('ROLE_PSYCHIATRIST');
        this.isSecretary = this.hasAuthority('ROLE_SECRETARY');
        this.isSocialAssistant = this.hasAuthority('ROLE_SOCIAL_ASSISTANT');
        if (this.user.firstName && this.user.lastName) {
            this.name = this.user.firstName + ' ' + this.user.lastName;
        }
    }

    close(result?: boolean) {
        this.modalController.dismiss({
            data: result
        });
    }

    submit() {
        if (this.isAdmin) {
            this.user.authorities.push('ROLE_ADMIN');
        }
        if (this.isDentist) {
            this.user.authorities.push('ROLE_DENTIST');
        }
        if (this.isPsychologist) {
            this.user.authorities.push('ROLE_PSYCHOLOGIST');
        }
        if (this.isPsychiatrist) {
            this.user.authorities.push('ROLE_PSYCHIATRIST');
        }
        if (this.isSecretary) {
            this.user.authorities.push('ROLE_SECRETARY');
        }
        if (this.isSocialAssistant) {
            this.user.authorities.push('ROLE_SOCIAL_ASSISTANT');
        }
        this.user.login = this.user.email;
        this.user.firstName = this.name.substr(0, this.name.indexOf(' '));
        this.user.lastName = this.name.substr(this.name.indexOf(' ') + 1);
        if (this.user.id) {
            this.userService.update(this.user).subscribe(
                () => this.onSuccess(),
                () => this.toast.showErrorMessage()
            );
        } else {
            this.userService.create(this.user).subscribe(
                () => this.onSuccess(),
                () => this.toast.showErrorMessage()
            );
        }
    }

    private hasAuthority(role: string) {
        return this.user.authorities.indexOf(role) !== -1;
    }

    private onSuccess() {
        this.toast.showSuccessMessage();
        this.close(true);
    }
}
