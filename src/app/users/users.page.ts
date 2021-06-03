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
import {UserEditionModal} from './edition/user-edition.modal';
import {InfiniteScrollPage} from "../shared/base/infinite-scroll.page";
import {User} from "../shared/model/user.model";
import {Principal} from "../shared/auth/principal.service";
import {AlertController, ModalController} from "@ionic/angular";
import {EventManager} from "../shared/services/event.manager.service";
import {ToastHelper} from "../shared/helpers/toast.helper";
import {UserService} from "../shared/services/user.service";
import {DeletionService} from "../shared/services/deletion.service";

@Component({
    selector: 'users-page',
    templateUrl: 'users.page.html',
    styleUrls: ['users.page.scss']
})
export class UsersPage extends InfiniteScrollPage<User> {

    private user: User;

    constructor(private userService: UserService,
                private principal: Principal,
                private alertController: AlertController,
                private modalController: ModalController,
                protected eventManager: EventManager,
                private toast: ToastHelper,
                private deletionService: DeletionService) {
        super(userService, eventManager, {
            roles: [
                'ROLE_ADMIN',
                'ROLE_DENTIST',
                'ROLE_PSYCHOLOGIST',
                'ROLE_PSYCHIATRIST',
                'ROLE_SECRETARY',
                'ROLE_SOCIAL_ASSISTANT'
            ],
            sort: ['firstName,asc']
        });
        this.principal.identity().then(user => this.user = user);
    }

    trackById(index, item: User): any {
        return item.id;
    }

    async create() {
        const modal = await this.modalController.create({
            component: UserEditionModal,
            componentProps: {
                user: new User()
            }
        });
        modal.present();
        modal.onDidDismiss().then(result => {
            if (result.data) {
                this.cleanLoad();
            }
        });
    }

    async edit(user: User) {
        const modal = await this.modalController.create({
            component: UserEditionModal,
            componentProps: {
                user
            }
        });
        modal.present();
    }

    tryDelete(user: User) {
        this.deletionService.delete({
            item: user,
            idProperty: 'login',
            crudService: this.userService
        }).subscribe(result => this.onDeletionSuccess(result))
    }

    private onDeletionSuccess(user: any) {
        const found = this.items.find(r => r.id === user.id);
        const index = this.items.indexOf(found);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    tryResetPassword(item: User) {
        this.alertController.create({
            header: 'Resetar senha',
            message: 'Você tem certeza que deseja resetar a senha deste usuário?',
            buttons: [
                {role: 'confirm', text: 'Sim', handler: () => this.resetPasswordConfirmed(item.id)},
                {role: 'cancel', text: 'Não'}
            ]
        }).then(alert => {
            alert.present();
        });
    }

    private resetPasswordConfirmed(id: number) {
        this.userService.resetPassword(id).subscribe(
            () => this.toast.showSuccessMessage("A senha desse usuário agora é: liberliber"),
            () => this.toast.showErrorMessage("Não foi possível resetar a senha do usuário!")
        );
    }

    deactivate(item: User) {
        this.userService.deactivate(item.id).subscribe(
            () => {
                item.activated = false;
                this.toast.showSuccessMessage("Usuário desativado!");
            },
            () => this.toast.showErrorMessage("Não foi possível desativar o usuário")
        );
    }

    activate(item: User) {
        this.userService.activate(item.id).subscribe(
            () => {
                item.activated = true;
                this.toast.showSuccessMessage("Usuário ativado!");
            },
            () => this.toast.showErrorMessage("Não foi possível ativar o usuário")
        );
    }
}
